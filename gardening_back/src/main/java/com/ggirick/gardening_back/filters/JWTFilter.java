package com.ggirick.gardening_back.filters;

import com.auth0.jwt.interfaces.DecodedJWT;
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
import java.util.List;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwt;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        try {
            DecodedJWT djwt = jwt.verifyToken(token);
            String id = djwt.getSubject();
            List<String> roles = djwt.getClaim("roles").asList(String.class);

            List<SimpleGrantedAuthority> auths = new ArrayList<>();
            roles.forEach(role -> auths.add(new SimpleGrantedAuthority("ROLE_" + role)));

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            id,
                            null,
                            auths
                    );

            SecurityContextHolder.getContext().setAuthentication(authToken);
        } catch (Exception e) { // 인증 실패시
            e.printStackTrace();
            SecurityContextHolder.clearContext();
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token Error");
        }
        filterChain.doFilter(request, response);
    }
}
