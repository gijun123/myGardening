package com.ggirick.gardening_back.dto.auth;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginHistoryDTO {

    private Long loginId;
    private String userUid;
    private String ipAddress;
    private String sessionId;
    private Date loginAt;
    private Date logoutAt;
}
