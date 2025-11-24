package com.ggirick.gardening_back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class GardeningBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(GardeningBackApplication.class, args);
    }

}
