package com.ggirick.gardening_back.dto.plant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantInfoRequestFileDTO {
    private long id;
    private String requestUserUid;
    private String url;
    private String oriName;
    private String sysName;
    private Timestamp createdAt;
}
