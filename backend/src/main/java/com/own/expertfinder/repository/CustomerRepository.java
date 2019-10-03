package com.own.expertfinder.repository;
import com.own.expertfinder.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findAll();

    @Override
    Customer getOne(Integer integer);

    Customer findByUserId(Integer id);

}
