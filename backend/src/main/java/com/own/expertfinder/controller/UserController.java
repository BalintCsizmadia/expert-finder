package com.own.expertfinder.controller;

import com.own.expertfinder.exception.UserAlreadyExistsException;
import com.own.expertfinder.model.User;
import com.own.expertfinder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(path = "/users",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<User> getUserById() {
        return userService.getAll();
    }

    @RequestMapping(path = "/user/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User getUserById(@PathVariable("id") Integer id) {
        return userService.getOne(id);
    }

    @RequestMapping(path = "/user/register",
        method = RequestMethod.POST
            )
    public User add(@RequestBody Map<String, String> req) throws UserAlreadyExistsException {
        User user = userService.createUserDataFromRequest(req);
        try {
            return userService.add(user);
        } catch (UserAlreadyExistsException e) {
            e.printStackTrace();
            throw new UserAlreadyExistsException();
        }
    }

    // Methods for users with COMPANY role

    @RequestMapping(path = "/user/login",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE,
            consumes = {"application/json"})
    public User loginUser(@RequestBody User user) {
        return userService.getUserByName(user.getUsername());
    }

    /*
    @PostMapping("/user/register")
    @Transactional
    public void addCompany(@RequestBody Map<String, String> map) throws UserAlreadyExistsException {
        String username = map.get("username");
        String name = map.get("name");
        String email = map.get("email");
        String password = map.get("password");
     //   String confirmationPassword = map.get("confirmationPassword");
        try {
            userService.userDetailsValidator(username, name, email, password, confirmationPassword, role, subscription);
        } catch (MissingRegistrationInfoException e) {
            logger.warn("Missing registration information.");
            throw new MissingRegistrationInfoException();
        }
        try {
            userService.add(username, password, role);
        } catch (UserAlreadyExistsException e) {
            logger.info(e.getMessage());
            throw new UserAlreadyExistsException();
        }
        try {
            companyService.add(username, name, email, subscription);
        } catch (WrongRoleSelectionException e) {
            logger.info((e.getMessage()));
            throw new WrongRoleSelectionException();
        }
    }

     */

}
