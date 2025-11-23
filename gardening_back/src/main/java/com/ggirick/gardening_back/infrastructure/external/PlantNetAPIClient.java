package com.ggirick.gardening_back.infrastructure.external;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class PlantNetAPIClient {
    private final WebClient plantWebClient;

    @Value("${plant.api-key}")
    private String apiKey;

    public Mono<String> identifyImage(MultipartFile image) {

        return plantWebClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v2/identify/all")   // ← project 고정
                        .queryParam("api-key", apiKey)
                        .build()
                )
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData("images", image.getResource()))
                .retrieve()
                .bodyToMono(String.class);
    }
}
