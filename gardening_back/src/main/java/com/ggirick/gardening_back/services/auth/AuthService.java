package com.ggirick.gardening_back.services.auth;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ggirick.gardening_back.exceptions.AuthenticationException;
import com.ggirick.gardening_back.dto.auth.*;
import com.ggirick.gardening_back.mappers.auth.AuthMapper;
import com.ggirick.gardening_back.mappers.auth.UserMapper;
import com.ggirick.gardening_back.mappers.auth.UserSessionMapper;
import com.ggirick.gardening_back.utils.JWTUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
public class AuthService {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserSessionMapper userSessionMapper;

    @Autowired
    private AuthMapper authMapper;

    @Autowired
    private UserMapper userMapper;

    /**
     * 로그인 처리: 사용자의 id,pw를 받아서 인증처리 후 AccessToken, Refresh Token을 발급합니다.
     * @param id, rawPassword, ipAddress
     * @return  AccessToken, Refresh Token을 담은 TokenPair
     */
    @Transactional
    public TokenPair login(String id, String rawPassword, String ipAddress) {

        //  사용자 인증 정보 조회
        AuthDTO authInfo = authMapper.selectAuthById(id);

        if (authInfo == null) {
            // DB에서 ID를 찾지 못한 경우
            throw new AuthenticationException("사용자 ID를 찾을 수 없습니다.");
        }

        //  비밀번호 검증 (PasswordEncoder 사용)
        if (!passwordEncoder.matches(rawPassword, authInfo.getPw())) {
            // 비밀번호 불일치
            throw new AuthenticationException("비밀번호가 일치하지 않습니다.");
        }

        //  토큰 생성을 위한 DTO 구성
        String userUid = authInfo.getUserUid(); // auth 테이블에서 가져온 UID
        UserTokenDTO userInfo = UserTokenDTO.builder()
                .uid(userUid)
                .provider(authInfo.getProvider()) // DB에 저장된 provider 사용
                .build();

        //  Access Token 및 Refresh Token 발급
        String accessToken = jwtUtil.createAccessToken(userInfo);
        String refreshToken = jwtUtil.createRefreshToken(userInfo);

        // user_session 테이블에 Refresh Token 기록
        Date refreshExpDate = jwtUtil.getRefreshTokenExpirationDate();

        //새로운 세션 생성
  
        UserSessionDTO newSession = UserSessionDTO.builder()
                .sessionId(UUID.randomUUID().toString())
                .userUid(userUid)
                .provider(authInfo.getProvider())
                .refreshToken(refreshToken)
                .expiresAt(refreshExpDate)
                .ipAddress(ipAddress)
                .isRevoked("N")
                .createdAt(new Date())
                .build();

        userSessionMapper.insertSession(newSession);

        System.out.println("새 세션 ID: " + newSession.getSessionId());

        //login_history 테이블에 기록
        LoginHistoryDTO loginHistory = LoginHistoryDTO.builder()
                .userUid(userUid)
                .sessionId(newSession.getSessionId())
                .ipAddress(ipAddress)
                .loginAt(new Date()) // 현재 시간
                .build();

        authMapper.insertLoginHistory(loginHistory);

        //  토큰 쌍 반환
        return new TokenPair(accessToken, refreshToken);
    }


    @Transactional
    public TokenPair refreshTokens(String refreshToken,String currentIpAddress){

        //Refresh Token 유효성 검증
        DecodedJWT djwt = jwtUtil.verifyToken(refreshToken);
        String uid = djwt.getSubject();
        String provider = djwt.getClaim("provider").asString();

        //DB의 user_session 저장 토큰과 비교, 만료되지 않았나 확인

        UserSessionDTO session = userSessionMapper.selectValidSessionByUidAndToken(uid, refreshToken);

        if(session == null){
            throw new TokenExpiredException("Invaild, Expired, or Revoked Refresh Token in DB", new Date().toInstant());
        }

        //새로운 Access Token 및 Refresh Token 발급

        UserTokenDTO userInfo = UserTokenDTO.builder().uid(uid).provider(provider).build();
        String newAccessToken = jwtUtil.createAccessToken(userInfo);
        String newRefreshToken = jwtUtil.createRefreshToken(userInfo);

        Date refreshExpDate = jwtUtil.getRefreshTokenExpirationDate();

        UserSessionDTO  newSession = UserSessionDTO .builder()
                .sessionId(UUID.randomUUID().toString())
                .userUid(uid)
                .provider(provider)
                .refreshToken(newRefreshToken)
                .expiresAt(refreshExpDate)

                // 현재 요청의 IP 주소를 저장
                .ipAddress(currentIpAddress)
                .isRevoked("N")
                .build();

        userSessionMapper.insertSession(newSession);

        return new TokenPair(newAccessToken, newRefreshToken);

    }

    /**
     * 로그아웃 처리: Refresh Token을 DB에서 무효화합니다.
     * @param logoutRequest 클라이언트가 보낸 Refresh Token
     * @return 무효화 성공 여부 (처리된 레코드 수)
     */
    @Transactional
    public int logout(LogoutRequestDTO logoutRequest) {

        String refreshToken = logoutRequest.getRefreshToken();

        if (refreshToken == null || refreshToken.isEmpty()) {
            return 0;
        }

            DecodedJWT data = jwtUtil.verifyToken(refreshToken);
            System.out.println("Refresh exp: " + data.getExpiresAt());
            System.out.println("Now: " + new Date());

        String userUid;

        try {

            userUid = jwtUtil.getUid(refreshToken);

        } catch (Exception e) {
            log.warn("로그아웃 실패: Refresh Token 파싱 오류 또는 만료됨");
            return 0; // 이미 만료된 토큰 → 클라이언트 입장에서 OK
        }


        // DB에서 해당 UID와 토큰으로 유효한 세션 정보 조회
        UserSessionDTO session = userSessionMapper.selectValidSessionByUidAndToken(userUid, refreshToken);

        if (session == null) {
            // 해당 토큰이 DB에 없거나, 이미 무효화되었거나, 만료된 경우
            log.info("해당 토큰 없음");
            return 0;
        }else{
            log.info(session.getSessionId());
        }
        System.out.println("Updating sessionId=" + session.getSessionId());


        authMapper.logoutHistory(session.getSessionId());


        // 3. 해당 세션 ID를 사용하여 DB에서 토큰을 무효화 (IS_REVOKED = 'Y'로 업데이트)
        return userSessionMapper.updateRevokedStatus(session.getSessionId());
    }

    // 전체 로그아웃 (모든 장치에서 로그아웃)
    @Transactional
    public int logoutAll(String userUid) {
        return userSessionMapper.revokeAllUserSessions(userUid);
    }

    public TokenPair issueTokenForOAuth(UserTokenDTO userInfo, String ipAddress) {
        String accessToken = jwtUtil.createAccessToken(userInfo);
        String refreshToken = jwtUtil.createRefreshToken(userInfo);
        Date refreshExpDate = jwtUtil.getRefreshTokenExpirationDate();

        UserSessionDTO newSession = UserSessionDTO.builder()
                .sessionId(UUID.randomUUID().toString())
                .userUid(userInfo.getUid())
                .provider(userInfo.getProvider())
                .refreshToken(refreshToken)
                .expiresAt(refreshExpDate)
                .ipAddress(ipAddress)
                .isRevoked("N")
                .createdAt(new Date())
                .build();

        userSessionMapper.insertSession(newSession);

        LoginHistoryDTO loginHistory = LoginHistoryDTO.builder()
                .userUid(userInfo.getUid())
                .sessionId(newSession.getSessionId())
                .ipAddress(ipAddress)
                .loginAt(new Date())
                .build();

        authMapper.insertLoginHistory(loginHistory);

        return new TokenPair(accessToken, refreshToken);
    }

    public boolean existingId(String id){
        AuthDTO existing = authMapper.selectAuthById(id);
        return existing != null;
    }


    @Transactional
    public void signup(AuthDTO dto) {
        try {
            //  ID 중복 체크
            if (existingId(dto.getId())) {
                throw new IllegalArgumentException("이미 사용 중인 ID입니다.");
            }

            //  UUID 생성
            String userUid = UUID.randomUUID().toString();

            // Users 테이블 등록
            int userInsert = userMapper.insertUser(userUid);
            if (userInsert != 1) {
                throw new RuntimeException("회원정보 생성 실패");
            }

            //  비밀번호 암호화
            dto.setPw(passwordEncoder.encode(dto.getPw()));

            //  Auth 테이블 등록
            dto.setUserUid(userUid);
            dto.setProvider("local");
            int authInsert = authMapper.insertAuth(dto);
            if (authInsert != 1) {
                throw new RuntimeException("인증정보 생성 실패");
            }

            // user_info 등록
            UserInfoDTO userInfoDTO = UserInfoDTO.builder()
                    .uuid(userUid)
                    .phone(dto.getPhone())
                    .bio("자기소개를 수정해주세요")
                    .nickname(userMapper.randomUserNickName())
                    .build();

            int infoInsert = userMapper.insertUserInfo(userInfoDTO);
            if (infoInsert != 1) {
                throw new RuntimeException("유저정보 생성 실패");
            }

        } catch (Exception e) {
            e.printStackTrace(); // Oracle/MyBatis 오류 확인
            throw e; // 트랜잭션 롤백
        }
    }




}
