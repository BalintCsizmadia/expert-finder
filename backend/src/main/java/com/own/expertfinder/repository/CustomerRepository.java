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

    List<Customer> findAllByProfessionId(Integer professionId);

    @Override
    Customer getOne(Integer integer);

    Customer findByUserId(Integer id);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO customers " +
            "(user_id, email, first_name, last_name, phone_number, profession_id, registration_date) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, NOW())",
            nativeQuery = true)
    void save(
            Integer userId,
            String email,
            String firstName,
            String lastName,
            String phoneNumber,
            Integer professionId,
            String position
    );

    // TODO available_from = NULL ? figure it out
    @Modifying
    @Transactional
    @Query("UPDATE Customer c SET c.status = ?2, available_from = NULL WHERE c.id = ?1")
    int updateStatusById(Integer customerId, Integer status);

    @Modifying
    @Transactional
    @Query("UPDATE Customer c SET c.availableFrom = ?2 WHERE c.id = ?1")
    int updateAvailableDateById(Integer customerId, Date date);

    @Modifying
    @Transactional
    @Query(value = "UPDATE customers SET position = CAST(?2 AS json) WHERE id = ?1", nativeQuery = true)
    int updatePositionById(Integer customerId, String position);

}
