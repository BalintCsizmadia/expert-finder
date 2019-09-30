package com.own.expertfinder.controller;

import com.own.expertfinder.exception.UserAlreadyExistsException;
import com.own.expertfinder.model.Customer;
import com.own.expertfinder.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @RequestMapping(path = "/customers",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Customer> getUsers() {
        return customerService.getAll();
    }

    @RequestMapping(path = "/customer/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Customer getUserById(@PathVariable("id") Integer id) {
        return customerService.getOne(id);
    }

    @RequestMapping(path = "/customer/register",
            method = RequestMethod.POST
    )
    public int add(@RequestBody Customer customer) throws UserAlreadyExistsException {
        try {
            return customerService.add(customer);
        } catch (UserAlreadyExistsException e) {
            e.printStackTrace();
            throw new UserAlreadyExistsException();
        }
    }}
