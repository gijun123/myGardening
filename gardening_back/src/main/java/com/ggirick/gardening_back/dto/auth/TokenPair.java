package com.ggirick.gardening_back.dto.auth;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenPair {
    private String accessToken;
    private String refreshToken;
}