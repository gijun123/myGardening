package com.ggirick.gardening_back.services.plant;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggirick.gardening_back.dto.plant.PlantNetResponseDTO;
import com.ggirick.gardening_back.infrastructure.external.PlantNetAPIClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlantNetService {
    private final PlantNetAPIClient plantNetAPIClient;
    private final ObjectMapper objectMapper = new ObjectMapper();  // JSON 파싱용 (필수 최소 사용)

    // 단일 이미지 분석
    public Mono<PlantNetResponseDTO> identifyOne(MultipartFile image) {

        return plantNetAPIClient.identifyImage(image)
                .flatMap(json -> {
                    try {
                        JsonNode root = objectMapper.readTree(json);

                        // bestMatch는 응답의 최상단에 존재
                        String bestMatch = root.path("bestMatch").asText(null);

                        return Mono.just(new PlantNetResponseDTO(bestMatch));

                    } catch (Exception e) {
                        log.error("PlantNet 응답 파싱 실패", e);
                        return Mono.error(new RuntimeException("PlantNet 응답 파싱 실패"));
                    }
                });
    }
}

