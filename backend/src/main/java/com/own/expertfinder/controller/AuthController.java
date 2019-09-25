package com.own.expertfinder.controller;

import com.own.expertfinder.model.Customer;
import com.own.expertfinder.model.User;
import com.own.expertfinder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.security.Principal;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;


    @GetMapping("")
    public User get(Principal principal) {
        return userService.getUserByName(principal.getName());
    }

   /*
    @GetMapping("/customer")
    public Customer getCustomer(Principal principal) {
        Customer customer = customerService.getCustomerByName(principal.getName());
    }

   */

    @DeleteMapping("")
    public void delete(HttpSession session) {
        session.invalidate();
    }

}