package com.ggirick.gardening_back.dto.auth;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTokenDTO {
    private String uid; // users.uid (UUID)
    private String provider; // auth.provider (e.g., "local", "kakao", "google")


}
