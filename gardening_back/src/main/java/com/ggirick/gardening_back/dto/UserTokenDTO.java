package com.ggirick.gardening_back.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTokenDTO {

    @Schema(description = "사용자 아이디", example = "testId")
    private String id;

    @Schema(description = "사용자 권한", example = "ADMIN")
    private String authority; // grade
}
