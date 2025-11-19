package com.ggirick.gardening_back.dto.auth;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoDTO {
    private String uuid;
    private String name;
    private String nickname;
    private String email;
    private String phone;
    private String address;
    private String addressDetail;
    private String zipcode;
    private String bio;
    private String profileUrl;
    private LocalDate birthDate; // yyyy-MM-dd 형식
}
