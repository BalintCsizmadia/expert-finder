package com.own.expertfinder.repository;

import com.own.expertfinder.dto.ProfessionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessionRepository extends JpaRepository<ProfessionDTO, Integer> {

    @Override
    List<ProfessionDTO> findAll();

}
