package com.ggirick.gardening_back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient plantNetWebClient() {
        return WebClient.builder()
                .baseUrl("https://my-api.plantnet.org") // Pl@ntNet 베이스 URL
                .build();
    }
}
