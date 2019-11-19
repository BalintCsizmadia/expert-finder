package com.own.expertfinder.service;

import com.own.expertfinder.dto.RegisterDTO;
import com.own.expertfinder.exception.UserAlreadyExistsException;
import com.own.expertfinder.model.Customer;
import com.own.expertfinder.model.User;
import com.own.expertfinder.model.Visitor;
import com.own.expertfinder.repository.CustomerRepository;
import com.own.expertfinder.repository.UserRepository;
import com.own.expertfinder.repository.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Component
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserDetailsManager userDetailsManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;


    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User getOne(Integer id) {
        return userRepository.getOne(id);
    }

    public User getUserByName(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public int add(RegisterDTO registrationData) throws UserAlreadyExistsException {
        String role =
                (registrationData.getRole() == Role.VISITOR.getRole()) ? Role.VISITOR.name() : Role.CUSTOMER.name();
        if (!userDetailsManager.userExists(registrationData.getUsername())) {
            userDetailsManager.createUser(new org.springframework.security.core.userdetails.User(
                    registrationData.getUsername(),
                    passwordEncoder.encode(registrationData.getPassword()),
                    AuthorityUtils.createAuthorityList(createRoleString(role)))
            );
            // TODO Refactor
            User user = getUserByName(registrationData.getUsername());
            if (registrationData.getRole() == Role.VISITOR.getRole()) {
                // Register a VISITOR
                System.out.println("Add visitor to DB");
                Visitor visitor = new Visitor();
                visitor.setUser(user);
                visitor.setEmail(registrationData.getUsername());
                visitor.setRegistrationDate(new Date());
                visitorRepository.save(visitor);
            } else if (registrationData.getRole() == Role.CUSTOMER.getRole()) {
                // Register a CUSTOMER
                System.out.println("Add customer to DB");
                Customer customer = new Customer();
                customer.setUser(user);
                customer.setEmail(registrationData.getUsername());
                customer.setFirstName(registrationData.getFirstName());
                customer.setLastName(registrationData.getLastName());
                customer.setPhoneNumber(registrationData.getPhoneNumber());
                customer.setProfessionId(registrationData.getProfessionId());
                customer.setRegistrationDate(new Date());
                customerRepository.save(
                        customer.getUser().getId(),
                        customer.getEmail(),
                        customer.getFirstName(),
                        customer.getLastName(),
                        customer.getPhoneNumber(),
                        customer.getProfessionId(),
                        customer.getPosition()
                );
            }
            // user.setRegistrationDate(new Date());
            return HttpStatus.CREATED.value(); // 201 - RESOURCE CREATED
        } else {
            throw new UserAlreadyExistsException("Repeated registration attempt. User already exists.");
        }
    }

    /**
     * @param role String (e.g., VISITOR, CUSTOMER)
     * @return String with "ROLE_" prefix
     */
    private String createRoleString(String role) {
        return "ROLE_" + role;
    }

    private enum Role {
        VISITOR(0),
        CUSTOMER(1);

        private final int value;

        Role(int value) {
            this.value = value;
        }

        private int getRole() {
            return this.value;
        }
    }
}
