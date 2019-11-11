package com.own.expertfinder.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.own.expertfinder.interfaces.RegisteredUser;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@Entity
@Table(name = "visitors", schema = "public")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Visitor extends AbstractModel implements Serializable, RegisteredUser {
    private String email;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    private Date registrationDate;

    public Visitor() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }
}
