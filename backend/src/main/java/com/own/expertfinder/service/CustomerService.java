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

    /*
    int add(Customer customer) {
        return customerRepository.add(
                customer.getUser().getId(),
                customer.getEmail(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getPhoneNumber(),
                customer.getProfessionId(),
                customer.getPosition()
        );
        */
    // or
        /*
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
    */

    public int updatePosition(Integer customerId, String position) {
        return customerRepository.updatePositionById(customerId, position);
    }

    public int updateStatusById(Integer customerId, Integer status) {
        return customerRepository.updateStatusById(customerId, status);
        /*
        Customer customer = customerRepository.getOne(customerId);
        customer.setStatus(status);
        return jdbcTemplate.update(
                "UPDATE customers SET status = ? WHERE id = ?",
                customer.getStatus(),
                customer.getId()
        );
         */
    }

    public int updateAvailableDateById(Integer customerId, Date date) {
        return customerRepository.updateAvailableDateById(customerId, date);
        /*
        Customer customer = customerRepository.getOne(customerId);
        customer.setAvailableFrom(date);
        return jdbcTemplate.update(
                "UPDATE customers SET available_from = ? WHERE id = ?",
                customer.getAvailableFrom(),
                customer.getId()
        );
         */
    }

    /**
     * @param professionId int
     * @return List of Customers with the given profession
     */
    public List<Customer> getCustomersByProfessionId(Integer professionId) {
        return customerRepository.findAllByProfessionId(professionId);
    }

}