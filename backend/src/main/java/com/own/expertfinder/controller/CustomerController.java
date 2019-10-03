package com.own.expertfinder.controller;

import com.own.expertfinder.model.Customer;
import com.own.expertfinder.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @RequestMapping(path = "/customers/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Customer getUserById(@PathVariable("id") Integer id) {
        return customerService.getOneByUserId(id);
    }

    @RequestMapping(path = "/customers/{id}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void updateCustomerStatus(@PathVariable("id") Integer id, @RequestBody Map<String, Integer> req) {
        Integer status = req.get("status");
        customerService.updateStatusById(id, status);
    }

}
