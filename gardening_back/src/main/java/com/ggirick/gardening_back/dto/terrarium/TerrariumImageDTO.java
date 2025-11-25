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
public class TerrariumImageDTO {
    private int id;
    private int terrariumId;
    private String oriName;
    private String sysName;
    private String url;
    private Timestamp createdAt;
}
