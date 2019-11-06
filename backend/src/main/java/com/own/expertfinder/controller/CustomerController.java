package com.own.expertfinder.controller;

import com.own.expertfinder.model.Customer;
import com.own.expertfinder.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
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
    public int updateCustomerStatus(@PathVariable("id") Integer id, @RequestBody Map<String, Integer> req) {
        Integer status = req.get("status");
        return customerService.updateStatusById(id, status);
    }

    @RequestMapping(path = "/customers/{id}/date",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public int updateCustomerAvailableDate(@PathVariable("id") Integer id, @RequestBody Map<String, String> req) {
        String dateString = req.get("availableFrom");
        Calendar parsedDate = javax.xml.bind.DatatypeConverter.parseDate(dateString);
        Date date = parsedDate.getTime();
        return customerService.updateAvailableDateById(id, date);
    }

    @RequestMapping(path = "/customers/{id}/position",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public int updatePosition(@PathVariable("id") Integer id, @RequestBody Map<String, String> req) {
        String position = req.get("position");
        return customerService.updatePosition(id, position);
    }

    @RequestMapping(path = "/customers/profession",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Customer> getCustomersByProfession(@RequestBody Map<String, String> req) {
        Integer professionId = Integer.parseInt(req.get("profession"));
        return customerService.getCustomersByProfessionId(professionId);
    }

}
