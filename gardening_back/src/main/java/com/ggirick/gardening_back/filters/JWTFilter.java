package com.ggirick.gardening_back.filters;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.ggirick.gardening_back.dto.auth.UserTokenDTO;
import com.ggirick.gardening_back.utils.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();
        if(path.startsWith("/auth/existIdCheck")
                || path.startsWith("/auth/signup")
                || path.startsWith("/auth/register")
                || path.startsWith("/oauth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String header=   request.getHeader("Authorization");
        if(header == null || !header.startsWith("Bearer ")){//만약 인증 정보가 없다면
            filterChain.doFilter(request,response);
            System.out.println("토큰 헤더 없음");
            return; // 여기서 리턴은 되돌려보내라는 말이 아님 . 아무 작업 없이 다음 필터에게 넘기라는 말임.
        }

        String accessToken = header.substring(7);

        try {
            // 2. Access Token 검증
            DecodedJWT djwt = jwtUtil.verifyToken(accessToken);

            // 3. 토큰에서 기본 정보 추출 (UID와 Provider는 필수 클레임)
            String uid = djwt.getClaim("uid").asString();
            String provider = djwt.getClaim("provider").asString();

            // 4. UserTokenDTO 생성 (SecurityContext의 Principal로 사용)
            UserTokenDTO userTokenDTO = UserTokenDTO.builder()
                    .uid(uid)
                    .provider(provider)
                    .build();

            // 5. 권한 정보 조회
            // 권한(ROLE) 정보는 토큰에 넣지 않고, DB 조회를 통해 최신 정보를 가져오는 것이 일반적입니다.
//            List<GrantedAuthority> authorities = authService.getUserAuthorities(uid);
//
            System.out.println("접속자 UID: " + uid);
//            System.out.println("접속자 권한: " + authorities.toString());
//
            // 6. SecurityContext에 인증 정보 설정
            //일단은 빈 리스트로 설정해줌
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userTokenDTO, null, Collections.emptyList());

            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            // 토큰 만료, 변조, 서명 오류 등의 경우
            SecurityContextHolder.clearContext();
            // **주의**: 만료 에러(TokenExpiredException)는 여기서 처리할 필요 없이,
            // Interceptor와 마찬가지로 401을 반환하게 하고 클라이언트가 Refresh API를 호출하도록 유도합니다.
            // 하지만 이 필터에서는 단순히 다음 필터로 넘겨서 SecurityConfig의 ExceptionHandler가 처리하게 할 수도 있습니다.
            System.out.println("JWT 인증 실패: " + e.getMessage());
        }

        // 7. 다음 필터로 진행
        filterChain.doFilter(request, response);
    }
}
