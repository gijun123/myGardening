package com.ggirick.gardening_back.handlers;


import com.ggirick.gardening_back.dto.auth.AuthDTO;
import com.ggirick.gardening_back.dto.auth.TokenPair;
import com.ggirick.gardening_back.dto.auth.UserTokenDTO;
import com.ggirick.gardening_back.mappers.auth.AuthMapper;
import com.ggirick.gardening_back.services.auth.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
public class OAuthLoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private AuthMapper authMapper;
    @Autowired
    private HttpSession httpSession;

    @Autowired
    @Lazy
    private AuthService authService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {
        try {
            DefaultOAuth2User oAuthUser = (DefaultOAuth2User) authentication.getPrincipal();

            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            String provider = oauthToken.getAuthorizedClientRegistrationId();
            String providerUserId = extractProviderUserId(provider, oAuthUser.getAttributes());

            // DB에서 Auth 조회
            AuthDTO auth = authMapper.selectAuthByProvider(provider, providerUserId);

            if (auth == null) {
                throw new IllegalStateException("OAuth 로그인 후 사용자 정보가 DB에 없음: provider=" + provider + ", providerUserId=" + providerUserId);
            }

            // 토큰 발급
            UserTokenDTO userInfo = UserTokenDTO.builder()
                    .uid(auth.getUserUid())
                    .provider(auth.getProvider())
                    .build();

            TokenPair tokenPair = authService.issueTokenForOAuth(userInfo, request.getRemoteAddr());

            // 응답
            boolean isNewUser = Boolean.TRUE.equals(httpSession.getAttribute("isNewUser"));

            String redirectUrl;
            if (isNewUser) {
                // 프론트엔드의 추가 정보 입력 페이지
                redirectUrl = "http://10.5.5.1:5173/oauth/redirect?uid=" + auth.getUserUid()
                        + "&accessToken=" + tokenPair.getAccessToken()
                        + "&refreshToken=" + tokenPair.getRefreshToken();
            } else {
                // 기존 유저는 홈
                redirectUrl = "http://10.5.5.1:5173/oauth/redirect?accessToken="
                        + tokenPair.getAccessToken()
                        + "&refreshToken=" + tokenPair.getRefreshToken();
            }

            response.sendRedirect(redirectUrl);

        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "OAuth 처리 중 오류 발생: " + e.getMessage());
        }


}

    private String extractProviderUserId(String provider, Map<String, Object> attributes) {
        return switch (provider) {
            case "kakao" -> attributes.get("id").toString();
            case "google" -> attributes.get("sub").toString();
            case "naver" -> ((Map<String, Object>) attributes.get("response")).get("id").toString();
            default -> throw new IllegalArgumentException("지원하지 않는 provider");
        };
    }

}
