package com.ggirick.gardening_back.controllers.tag;

import com.ggirick.gardening_back.dto.tag.PlantTagDTO;
import com.ggirick.gardening_back.services.tag.PlantTagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tags")
public class PlantTagController {

    private final PlantTagService plantTagService;

    // 학명 기반 태그 조회
    @Operation(
            summary = "학명 기반 태그 조회",
            description = """
                    PlantNet 분석으로 얻은 식물의 학명(scientificName)을 기반으로
                    연관 태그 목록을 조회한다.
                    
                    우선 정확한 매칭을 시도하고, 없으면 LIKE 검색 기반으로 fallback 조회를 수행한다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = PlantTagDTO.class))
                    )
            )
    })
    @GetMapping("/by-scientific-name")
    public ResponseEntity<List<PlantTagDTO>> getTagsByScientificName(
            @RequestParam String scientificName
    ) {
        List<PlantTagDTO> tags = plantTagService.getTagsByScientificName(scientificName);
        return ResponseEntity.ok(tags);
    }

    // tagId 리스트로 태그 복수 조회
    @Operation(
            summary = "태그 ID 목록 기반 조회",
            description = """
                    여러 tagId를 전달하면 해당하는 태그 정보를 한 번에 조회한다.
                    게시글 상세 조회 시 태그 목록 표시 등에 활용된다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = PlantTagDTO.class))
                    )
            )
    })
    @PostMapping("/by-ids")
    public ResponseEntity<List<PlantTagDTO>> getTagsByIds(
            @RequestBody List<Integer> tagIds
    ) {
        List<PlantTagDTO> tags = plantTagService.getTagsByIds(tagIds);
        return ResponseEntity.ok(tags);
    }
}
