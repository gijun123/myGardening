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
public class PlantSearchRequestLogDTO {
    private long logId;
    private String userUid;
    private String apiResponse;
    private String matchedScientificName;
    private Timestamp createdAt;
}
