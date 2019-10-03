package com.own.expertfinder.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.own.expertfinder.interfaces.GeneralUserInterface;
import com.own.expertfinder.util.HashMapConverter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;

@Entity
@Table(name = "customers", schema = "public")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customer extends AbstractModel implements Serializable, GeneralUserInterface {
    private String email;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profession;
    private Boolean isActive;
    // TODO Choose the right solution
    // @Convert(converter = HashMapConverter.class)
    // private Map<String, Object> position;
    private String position;
    /**
     * - 0 -> Available
     * - 1 -> Not available
     */
    private Integer status;
    // private Integer availableFrom; // TODO type?
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Date registrationDate;


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

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
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

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

}
