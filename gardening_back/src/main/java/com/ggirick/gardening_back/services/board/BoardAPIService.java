package com.ggirick.gardening_back.services.board;

import com.ggirick.gardening_back.dto.board.BoardRequestDTO;
import com.ggirick.gardening_back.dto.plant.PlantNetResponseDTO;
import com.ggirick.gardening_back.dto.tag.PlantTagDTO;
import com.ggirick.gardening_back.services.plant.PlantNetService;
import com.ggirick.gardening_back.services.tag.PlantTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardAPIService {

    private final PlantNetService plantNetService;
    private final PlantTagService plantTagService;

    /**
     * 이미지 업로드 → PlantNet 분석 → 학명 기반 자동 태그 추천
     */
    public List<PlantTagDTO> analyzeImage(MultipartFile file) {

        // 파일이 없으면 태그 추천 안 함
        if (file == null || file.isEmpty()) {
            return List.of();  // 빈 리스트 반환
        }

        // PlantNet 호출
        Mono<PlantNetResponseDTO> mono = plantNetService.identifyOne(file);
        PlantNetResponseDTO response = mono.block();

        if (response == null || response.getScientificName() == null) {
            return List.of();
        }

        String sciName = response.getScientificName();

        // 해당 학명 기반 태그 목록 조회
        return plantTagService.getTagsByScientificName(sciName);
    }
}
