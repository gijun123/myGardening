package com.ggirick.gardening_back.dto.plant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantInfoDTO {
    private String commonName;
    private String environment;
    private String family;
    private String fertilizer;
    private String genus;
    private String light;
    private String origin;
    private String pestsTips;
    private String potRepot;
    private String propagation;
    private String scientificName;
    private String soil;
    private String temperatureHumidity;
    private String watering;

}
