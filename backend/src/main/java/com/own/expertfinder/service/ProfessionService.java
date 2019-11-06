package com.own.expertfinder.service;

import com.own.expertfinder.dto.ProfessionDTO;
import com.own.expertfinder.repository.ProfessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProfessionService {

    @Autowired
    private ProfessionRepository professionRepository;

    public List<ProfessionDTO> getProfessions() {
        return professionRepository.findAll();
    }

}
