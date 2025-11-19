package com.ggirick.gardening_back.controllers;

import com.ggirick.gardening_back.dto.auth.UserTokenDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @Operation(summary = "테스트용 API", description = "\"test\"를 반환한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "test",
                    content = @Content(
                            schema = @Schema(implementation = UserTokenDTO.class)
                    )
            )
    })
    @GetMapping
    public UserTokenDTO test() {
        return UserTokenDTO.builder().uid("6c9fb0c9-e970-4dd7-9011-aec84f2eb1f7").build();
    }
}
