package com.ggirick.gardening_back.dto.auth;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersDTO {
    private String uuid;
    private String status;
    private Date createdAt;
    private Date updatedAt;

}
