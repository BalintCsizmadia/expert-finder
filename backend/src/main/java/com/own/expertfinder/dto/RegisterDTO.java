package com.own.expertfinder.dto;


public class RegisterDTO {
    private String username; // email
    private String password;
    private int role;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Integer professionId;
    // private Boolean isActive;

    public RegisterDTO() {
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public int getRole() {
        return role;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Integer getProfessionId() {
        return professionId;
    }
}
