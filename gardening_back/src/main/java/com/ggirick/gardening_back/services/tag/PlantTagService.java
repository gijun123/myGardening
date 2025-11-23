package com.ggirick.gardening_back.services.tag;

import com.ggirick.gardening_back.dto.tag.PlantTagDTO;
import com.ggirick.gardening_back.mappers.tag.PlantTagMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlantTagService {
    private final PlantTagMapper plantTagMapper;

    // PlantAPI bestMatch로 plant_tag_with 연결해서 태그 목록 가져오기
    public List<PlantTagDTO> getTagsByScientificName(String scientificName) {
        if (scientificName == null || scientificName.isBlank()) {
            log.debug("태그 조회 생략 — scientificName이 비어 있음");
            return List.of();
        }

        // 1) 정확한 매칭
        List<PlantTagDTO> exact = plantTagMapper.getTagsByScientificName(scientificName);
        if (!exact.isEmpty()) {
            return exact;
        }

        // 2) fallback: LIKE 기반 검색 (학명의 첫 단어로 검색)
        String firstWord = scientificName.split(" ")[0];

        return plantTagMapper.getTagsByScientificNameLike("%" + firstWord + "%");
    }

    public List<PlantTagDTO> getTagsByIds(List<Integer> tagIds) {
        if (tagIds == null || tagIds.isEmpty()) return List.of();
        return plantTagMapper.getTagsByIds(tagIds);
    }
}
