package com.ggirick.gardening_back.controllers.board;

import com.ggirick.gardening_back.dto.tag.PlantTagDTO;
import com.ggirick.gardening_back.services.board.BoardAPIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardAPIController {

    private final BoardAPIService boardAPIService;

    // 이미지 기반 자동 태그 추천
    @Operation(
            summary = "이미지 자동 태그 추천",
            description = """
                    업로드한 식물 이미지를 기반으로 PlantNet 분석을 수행하여
                    가장 유력한 식물 학명을 추출하고,
                    그 학명과 연결된 태그 목록을 반환한다.
                    
                    단일 이미지 기준이며 저장 전 태그 추천에 사용된다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "태그 추천 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = PlantTagDTO.class))
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "이미지가 없거나 잘못된 요청"
            )
    })
    @PostMapping(
            value = "/analyze-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<List<PlantTagDTO>> analyzeImage(
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        List<PlantTagDTO> tags = boardAPIService.analyzeImage(image);
        return ResponseEntity.ok(tags);
    }
}
