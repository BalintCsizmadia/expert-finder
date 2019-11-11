package com.own.expertfinder.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.own.expertfinder.interfaces.RegisteredUser;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "users", schema = "public")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User extends AbstractModel implements Serializable, RegisteredUser {

    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean enabled;

    // @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ElementCollection
    @CollectionTable(
            name = "authorities",
            joinColumns = @JoinColumn(name = "username", referencedColumnName = "username")
    )
    @Column(name = "authority")
    private List<String> authorities;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    // TODO should store this value here
    private Date registrationDate;

    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }
}
