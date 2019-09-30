package com.own.expertfinder.service;

import com.own.expertfinder.exception.UserAlreadyExistsException;
import com.own.expertfinder.model.Customer;
import com.own.expertfinder.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserDetailsManager userDetailsManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private AuthenticationManager authenticationManager;

    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    public Customer getOne(Integer id) {
        return customerRepository.getOne(id);
    }

    public Customer getCustomerByName(String username) {
        return customerRepository.findByUsername(username);
    }

    public int add(Customer customer) throws UserAlreadyExistsException {
        if (!isUsernameExists(customer.getUsername())) {
            // return customerRepository.save(customer);
            // TODO Refactor / Change
            return jdbcTemplate.update(
                    "INSERT INTO customers " +
                            "(username, password, first_name, last_name, phone_number, profession, position, registration_date) " +
                            "VALUES (?, ?, ?, ?, ?, ?, to_json(?::json), NOW())",
                    customer.getUsername(),
                    customer.getPassword(),
                    customer.getFirstName(),
                    customer.getLastName(),
                    customer.getPhoneNumber(),
                    customer.getProfession(),
                    customer.getPosition()
            );
        } else {
            throw new UserAlreadyExistsException("Repeated registration attempt. User already exists.");
        }
    }

    private boolean isUsernameExists(String username) {
        Customer customer = getCustomerByName(username);
        return customer != null;
    }

}