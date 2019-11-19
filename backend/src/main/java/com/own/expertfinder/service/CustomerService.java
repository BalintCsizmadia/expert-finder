package com.own.expertfinder.service;

import com.own.expertfinder.model.Customer;
import com.own.expertfinder.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;
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

    public int updatePosition(Integer customerId, String position) {
        return customerRepository.updatePositionById(customerId, position);
    }

    public int updateStatusById(Integer customerId, Integer status) {
        return customerRepository.updateStatusById(customerId, status);
    }

    public int updateAvailableDateById(Integer customerId, Date date) {
        return customerRepository.updateAvailableDateById(customerId, date);
    }

    /**
     * @param professionId int
     * @return List of Customers with the given profession
     */
    public List<Customer> getCustomersByProfessionId(Integer professionId) {
        return customerRepository.findAllByProfessionId(professionId);
    }

}