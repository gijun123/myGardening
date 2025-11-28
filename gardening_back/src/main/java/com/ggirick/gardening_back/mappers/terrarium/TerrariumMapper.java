package com.ggirick.gardening_back.mappers.terrarium;

import com.ggirick.gardening_back.dto.terrarium.TerrariumDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TerrariumMapper {

    int insertTerrarium(TerrariumDTO tDTO);
    TerrariumDTO getTerrariumById(int id);

}
