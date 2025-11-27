package com.ggirick.gardening_back.services.terrarium;

import com.ggirick.gardening_back.dto.terrarium.TerrariumImageDTO;
import com.ggirick.gardening_back.mappers.terrarium.ImageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerrariumImageService {
    private final ImageMapper imageMapper;

    public TerrariumImageDTO saveImage(int terraruiumId, MultipartFile file){
        String sysName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String url = "/uploads/" + sysName;

        imageMapper.insertImage(terraruiumId,file.getOriginalFilename(),sysName,url);

        return TerrariumImageDTO.builder().terrariumId(terraruiumId).
                oriName(file.getOriginalFilename()).sysName(sysName).url(url).build();
    }
}
