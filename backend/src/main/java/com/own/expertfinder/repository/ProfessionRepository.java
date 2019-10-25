package com.own.expertfinder.repository;

import com.own.expertfinder.dto.ProfessionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProfessionRepository extends JpaRepository<ProfessionDTO, Integer> {

    @Override
    List<ProfessionDTO> findAll();

    // TODO Remove later
    @Modifying
    @Transactional
    @Query(value ="select new ProfessionDTO(id, nameEN, nameHU) from ProfessionDTO u",
            nativeQuery = true)
    List<ProfessionDTO> getProfessions();
}
