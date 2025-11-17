package com.ggirick.gardening_back.config;

import com.ggirick.gardening_back.filters.JWTFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JWTFilter jwtFilter;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                http.
                cors(cors->cors.configurationSource(corsConfigurationSource()))
                .formLogin(form -> form.disable()) // Spring Security 가 제공하는 form Login 기능을 off 시켜 자원 낭비 방지
                .httpBasic(basic -> basic.disable()) // Authorization header  기반의 로그인 처리 방식을 차단하여 자원 낭비 방지
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // JWT 토큰 기반 인증을 사용하는 서버에서 불필요한 Session 생성 및 검증 로직을 차단하여 자원 낭비 방지
                .csrf(csrf -> csrf.disable()); // CSRF 공격 방어 필터 -> 개발단계에선 off but 실전에선 필요

                http.authorizeHttpRequests(auth->{
                    auth.requestMatchers("/member/**").authenticated()
                            .requestMatchers("/admin/**").hasRole("ADMIN") // admin은 로그인되어있는걸 포함하고있고 hasRole은 admin일 때 , 그 외에 것들은 그 아래로 모두 허용. 내려갈때마다 큰 범위의 인가를 해야함
                            .anyRequest().permitAll();
                });

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // 1인자=넣고싶은 필터 , jwt는 2인자가 저걸로 고정 (넣고싶은필터)
        return http.build();
    }
}
