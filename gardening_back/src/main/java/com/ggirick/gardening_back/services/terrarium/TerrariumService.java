package com.ggirick.gardening_back.services.terrarium;

import com.ggirick.gardening_back.dto.terrarium.TerrariumDTO;
import com.ggirick.gardening_back.mappers.terrarium.TerrariumMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TerrariumService {
    private final TerrariumMapper terrariumMapper;

    public int createTerrarium(TerrariumDTO terrariumDTO){
        terrariumMapper.insertTerrarium(terrariumDTO);
        return terrariumDTO.getId();
    }
    public TerrariumDTO getTerrariumById(int id){
        return terrariumMapper.getTerrariumById(id);
    }
}
