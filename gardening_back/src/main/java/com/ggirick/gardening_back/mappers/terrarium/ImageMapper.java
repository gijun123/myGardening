package com.ggirick.gardening_back.mappers.terrarium;

import com.ggirick.gardening_back.dto.terrarium.TerrariumAssetImageDTO;
import com.ggirick.gardening_back.services.terrarium.TerrariumAssetImageService;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ImageMapper {

    List<TerrariumAssetImageDTO> getAllAssets();
}