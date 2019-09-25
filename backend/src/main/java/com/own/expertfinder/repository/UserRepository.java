package com.own.expertfinder.repository;

import com.codecool.fixedchance.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findAll();

    User findByUsername(String username);
}
