package com.own.expertfinder.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;

@Entity
@Table(name = "customers", schema = "public")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customer extends User implements Serializable {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profession;
    private Boolean isActive;
    private HashMap<String, Object> position; // TODO fill with data and sava as JSON
    private Status status;
    // private Integer availableFrom; // TODO type?

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public HashMap<String, Object> getPosition() {
        return position;
    }

    public void setPosition(HashMap<String, Object> position) {
        this.position = position;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

   /*
    public Integer getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(Integer availableFrom) {
        this.availableFrom = availableFrom;
    }
     */

    private enum Status {
        AVAILABLE,
        NOT_AVAILABLE
    }
}
