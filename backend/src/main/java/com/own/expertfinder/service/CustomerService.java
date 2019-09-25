package com.own.expertfinder.service;

import com.own.expertfinder.model.Customer;
import com.own.expertfinder.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;

@Component
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserDetailsManager userDetailsManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public Customer getOne(Integer id) {
        return customerRepository.getOne(id);
    }

    public Customer getUserByName(String username) {
        return customerRepository.findByUsername(username);
    }

}