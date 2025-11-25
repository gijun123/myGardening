package com.ggirick.gardening_back.dto.terrarium;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TerrariumDTO {
    private int id;
    private String userId;
    private String title;
    private String description;
    private Boolean isPublic;
    private int width;
    private int height;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
