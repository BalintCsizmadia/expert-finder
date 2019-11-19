package com.own.expertfinder.controller;

import com.own.expertfinder.dto.RegisterDTO;
import com.own.expertfinder.exception.UserAlreadyExistsException;
import com.own.expertfinder.model.User;
import com.own.expertfinder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(path = "/register",
            method = RequestMethod.POST
    )
    public int add(@RequestBody RegisterDTO registerDTO) throws UserAlreadyExistsException {
        try {
            return userService.add(registerDTO);
        } catch (UserAlreadyExistsException e) {
            e.printStackTrace();
            throw new UserAlreadyExistsException();
        }
    }

    @RequestMapping(path = "/users",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<User> getAll() {
        return userService.getAll();
    }

    @RequestMapping(path = "/users/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User getOne(@PathVariable("id") Integer id) {
        return userService.getOne(id);
    }

}
