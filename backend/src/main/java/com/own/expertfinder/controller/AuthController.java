package com.own.expertfinder.controller;

import com.own.expertfinder.interfaces.GeneralUserInterface;
import com.own.expertfinder.model.User;
import com.own.expertfinder.service.CustomerService;
import com.own.expertfinder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    private CustomerService customerService;


    @GetMapping("")
    public GeneralUserInterface get(Principal principal) {
        User user = userService.getUserByName(principal.getName());
        if (isRole("ROLE_VISITOR")) {
            return user;
        } else if (isRole("ROLE_CUSTOMER")) {
            // returns Customer object
            return customerService.getOneByUserId(user.getId());
        } else {
            // TODO handle
            return null;
        }
        // return userService.getUserByName(principal.getName());
    }

    @DeleteMapping("")
    public void delete(HttpSession session) {
        session.invalidate();
    }

    private boolean isRole(String role) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                .anyMatch(r -> r.getAuthority().equals(role));
    }

}