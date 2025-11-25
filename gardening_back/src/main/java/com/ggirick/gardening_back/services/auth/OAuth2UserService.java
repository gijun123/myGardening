package com.ggirick.gardening_back.services.auth;


import com.ggirick.gardening_back.dto.auth.AuthDTO;
import com.ggirick.gardening_back.dto.auth.UserInfoDTO;
import com.ggirick.gardening_back.dto.auth.UserRoleDTO;
import com.ggirick.gardening_back.mappers.auth.AuthMapper;
import com.ggirick.gardening_back.mappers.auth.UserMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final HttpSession httpSession; // OK
    private final AuthMapper authMapper;
    private final UserMapper userMapper;
    @Lazy
    private final AuthService authService;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);


        Map<String, Object> attributes = oAuth2User.getAttributes();
        log.info("attributes :: " + attributes);

        httpSession.setAttribute("login_info", attributes);

        String providerUserId="";


        String provider = userRequest.getClientRegistration().getRegistrationId(); // kakao, google 등

        UserInfoDTO infoDTO = new UserInfoDTO();
        AuthDTO authDTO = new AuthDTO();
        if ("kakao".equals(provider)) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            if (kakaoAccount != null) {
                providerUserId  = String.valueOf(attributes.get("id"));
                authDTO.setEmail((String) kakaoAccount.get("email"));

                infoDTO.setName((String) kakaoAccount.get("name"));
                authDTO.setPhone((String) kakaoAccount.get("phone_number")); // 여기서 phone 가져오기
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

                if (profile != null) {

                    infoDTO.setNickname((String) profile.get("nickname"));
                    String profileUrl = (String) profile.get("profile_image_url");

                    if (profileUrl == null) {
                        profileUrl = (String) profile.get("thumbnail_image_url");
                    }

                    infoDTO.setProfileUrl(profileUrl);
                }

            }
        } else if ("google".equals(provider)) {
            authDTO.setEmail( (String) attributes.get("email"));
            providerUserId  = String.valueOf(attributes.get("sub"));
        } else if ("naver".equals(provider)) {
            Map<String, Object> response = (Map<String, Object>) attributes.get("response");
            if (response != null) {
                authDTO.setEmail( (String) attributes.get("email"));
                providerUserId  = (String) response.get("id"); // 여기만 사용
            }
        }

        authDTO.setProvider(provider);
        authDTO.setProviderUserId(providerUserId);

        System.out.println("provider:" + provider);
        System.out.println("providerUserId: " + providerUserId);

        // Role generate
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_MEMBER");

        // nameAttributeKey
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        // DB 저장로직이 필요하면 추가
        AuthDTO existingAuth = authMapper.selectAuthByProvider(provider, providerUserId);

        boolean isNewUser = false;
        if (existingAuth == null) {
            // 신규 사용자면 회원가입
            authService.registerOAuthUser(infoDTO,authDTO);

            isNewUser = true;
        }
        httpSession.setAttribute("isNewUser", isNewUser);

        return new DefaultOAuth2User(authorities,
                oAuth2User.getAttributes(),
                userNameAttributeName);
    }

}
