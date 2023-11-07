package com.vti.testing.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;

@Configuration
public class configuration {
    @Bean
    public ModelMapper initModelMapper(){
        return new ModelMapper();
    }
}
