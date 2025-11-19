package com.ggirick.gardening_back.dto.auth;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequestDTO {
    // 로컬 로그인 ID
    private String id;

    // 암호화되지 않은 원본 비밀번호 (raw password)
    private String password;
}
