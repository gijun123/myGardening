package com.ggirick.gardening_back.config;

import com.google.genai.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeminiConfig {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    /**
     * Gemini Client 객체를 Spring Bean으로 등록합니다.
     * @return Gemini API Client
     */
    @Bean
    public Client geminiClient() {
        // @Value 주입이 완료된 후 Client를 안전하게 생성합니다.
        if (geminiApiKey == null || geminiApiKey.isEmpty()) {
            throw new IllegalArgumentException("gemini.api.key must be set in application.properties/yml");
        }
        return Client.builder().apiKey(geminiApiKey).build();
    }
}
