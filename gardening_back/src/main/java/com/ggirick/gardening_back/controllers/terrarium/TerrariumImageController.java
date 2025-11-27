package com.ggirick.gardening_back.controllers.terrarium;

import com.ggirick.gardening_back.dto.terrarium.TerrariumImageDTO;
import com.ggirick.gardening_back.services.terrarium.TerrariumImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/terrariumImage")
@RequiredArgsConstructor
public class TerrariumImageController {

    private final TerrariumImageService tiServ;

    @PostMapping("/upload")
    public ResponseEntity<TerrariumImageDTO> uploadImage(@RequestParam int terrariumId,@RequestParam MultipartFile file){
        TerrariumImageDTO saved = tiServ.saveImage(terrariumId,file);
        return ResponseEntity.ok(saved);
    }
}
