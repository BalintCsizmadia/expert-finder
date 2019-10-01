package com.own.expertfinder.service;

import com.own.expertfinder.model.Customer;
import com.own.expertfinder.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    public Customer getOne(Integer id) {
        return customerRepository.getOne(id);
    }

    public Customer getOneByUserId(Integer userId) {
        return customerRepository.findByUserId(userId);
    }

    public int add(Customer customer) {
        // return customerRepository.save(customer);
        // TODO Refactor / Change
        return jdbcTemplate.update(
                "INSERT INTO customers " +
                        "(user_id ,email, first_name, last_name, phone_number, profession, position, registration_date) " +
                        "VALUES (?, ?, ?, ?, ?, ?, to_json(?::json), NOW())",
                customer.getUser().getId(),
                customer.getEmail(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getPhoneNumber(),
                customer.getProfession(),
                customer.getPosition()
        );

    }

}