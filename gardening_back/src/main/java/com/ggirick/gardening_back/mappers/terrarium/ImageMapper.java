package com.ggirick.gardening_back.mappers.terrarium;

import com.ggirick.gardening_back.dto.terrarium.TerrariumAssetImageDTO;
import com.ggirick.gardening_back.services.terrarium.TerrariumAssetImageService;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ImageMapper {

    // 공용이미지 가져오는거
    List<TerrariumAssetImageDTO> getAllAssets();

    void insertImage(@Param("terrariumId") int terrariumId,
                     @Param("oriName") String oriName,
                     @Param("sysName") String sysName,
                     @Param("url") String url);
}