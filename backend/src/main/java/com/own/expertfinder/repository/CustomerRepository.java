package com.own.expertfinder.repository;
import com.own.expertfinder.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findAll();

    @Override
    Customer getOne(Integer integer);

    Customer findByUserId(Integer id);

    @Modifying
    @Transactional
    @Query("UPDATE Customer c SET c.status = ?2 WHERE c.id = ?1")
    int updateStatusById(Integer customerId, Integer status);

    @Modifying
    @Transactional
    @Query("UPDATE Customer c SET c.availableFrom = ?2 WHERE c.id = ?1")
    int updateAvailableDateById(Integer customerId, Date date);
}
