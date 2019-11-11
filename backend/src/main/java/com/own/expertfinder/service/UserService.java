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
                customer.setPosition(registrationData.getPosition());
                customer.setRegistrationDate(new Date());
                customerRepository.add(
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
     *
     * @param role String (e.g., VISITOR, CUSTOMER)
     * @return String with "ROLE_" prefix
     */
    private String createRoleString(String role) {
        return "ROLE_" + role;
    }

/*
    @Transactional
    public User add(String username, String password, String role)
            throws UserAlreadyExistsException {
        User user;
        if (!isUsernameExists(username)) {
            userDetailsManager.createUser(new org.springframework.security.core.userdetails.User(
                    username,
                    passwordEncoder.encode(password),
                    AuthorityUtils.createAuthorityList("ROLE_" + role)));
            user = userRepository.findByUsername(username);
            user.setEnabled(true);
            user.setAll(user);
            userRepository.save(user);
            logger.info(userRepository.findByUsername(username) + " added to database.");
        } else {
            logger.info("Repeated registration attempt. User already exists.");
            throw new UserAlreadyExistsException("Repeated registration attempt. User already exists.");
        }
        return user;
    }

    @Transactional
    public User add(User user) {
        List<GrantedAuthority> roles = user.getAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                null,
                roles);

        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(auth);
        return user;
    }

    private boolean isUsernameExists(String username) {
        User user = getUserByName(username);
        return user != null;
    }

    private User getGoogleAuthenticatedUser(String username, String role) {
        if (!isUsernameExists(username)) {
            userDetailsManager.createUser(new org.springframework.security.core.userdetails.User(
                    username,
                    "",
                    AuthorityUtils.createAuthorityList("ROLE_" + role)));
            logger.info(getUserByName(username) + " added to database.");
        }
        return getUserByName(username);
    }

    public void userDetailsValidator(String username, String name, String email,
                                     String password, String confirmationPassword, String role,
                                     String subscription) throws MissingRegistrationInfoException, EmailAlreadyExistsException {
        SimpleUser simpleUser = simpleUserService.find(email);
        Company comp = companyService.find(email);
        if (simpleUser != null || comp != null) {
            logger.info("Registration attempt with an already used e-mail address");
            throw new EmailAlreadyExistsException("Registration attempt with an already used e-mail address");
        }
        if (role.equals("COMPANY")) {
            if (name == null || name.equals("")) {
                throw new MissingRegistrationInfoException();
            }
            if (name.length() < 4) {
                name = name + new Random().nextInt(900) + 100;
            }
            if (subscription == null) {
                throw new MissingRegistrationInfoException();
            }
        }
        if (role.equals("STUDENT") || role.equals("TEACHER")) {
            if (username == null || username.equals("")) {
                throw new MissingRegistrationInfoException();
            }
            if (username.length() < 4) {
                username = username + new Random().nextInt(900) + 100;
            }
        }
        if (email == null || email.equals("") || password == null || password.equals("") ||
                confirmationPassword == null || confirmationPassword.equals("")) {
            throw new MissingRegistrationInfoException();
        }
        if (!password.equals(confirmationPassword)) {
            throw new IllegalArgumentException("Password does not match the confirm password");
        }
    }

 */

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
