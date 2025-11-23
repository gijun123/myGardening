package com.ggirick.gardening_back.controllers.plant;

import com.ggirick.gardening_back.dto.plant.PlantNetResponseDTO;
import com.ggirick.gardening_back.services.plant.PlantNetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/plantnet")
public class PlantNetController {

    private final PlantNetService plantNetService;

    @Operation(
            summary = "식물 이미지 인식",
            description = "이미지를 PlantNet AI에 보내고 bestMatch 결과를 반환한다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "분석 성공",
            content = @Content(schema = @Schema(implementation = PlantNetResponseDTO.class))
    )
    @PostMapping(value = "/identify", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<ResponseEntity<PlantNetResponseDTO>> identify(
            @RequestPart("file") MultipartFile file
    ) {
        return plantNetService.identifyOne(file)
                .map(ResponseEntity::ok);
    }
}
