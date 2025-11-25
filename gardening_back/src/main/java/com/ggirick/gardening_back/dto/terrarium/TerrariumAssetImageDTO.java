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
public class TerrariumAssetImageDTO {
    private int id;
    private String category;
    private String name;
    private String url;
    private Timestamp createdAt;
}
