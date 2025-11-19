package com.ggirick.gardening_back.dto.auth;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthDTO {

    private Long authId;
    private String userUid;
    private String provider;
    private String providerUserId;
    private String id;
    private String pw;
    private String phone;
    private String email;
    private Date createdAt;
    private Date updatedAt;
}
