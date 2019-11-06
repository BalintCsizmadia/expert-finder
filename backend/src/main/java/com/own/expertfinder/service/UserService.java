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

    // HTTP status code
    private final int RESOURCE_CREATED = 201;

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

    /*
    @Autowired
    private SimpleUserService simpleUserService;

    @Autowired
    private CompanyService companyService;

    public User getUserByName(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }
     */

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
        String role = (registrationData.getRole()) == 0 ? "VISITOR" : "CUSTOMER";
        if (!userDetailsManager.userExists(registrationData.getUsername())) {
            userDetailsManager.createUser(new org.springframework.security.core.userdetails.User(
                    registrationData.getUsername(),
                    passwordEncoder.encode(registrationData.getPassword()),
                    AuthorityUtils.createAuthorityList("ROLE_" + role))
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
            return RESOURCE_CREATED;
            // user.setRegistrationDate(new Date());
        } else {
            throw new UserAlreadyExistsException("Repeated registration attempt. User already exists.");
        }
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

    // TODO: Move to a new package as a regular method
    public GoogleIdToken.Payload getGooglePayload(final String googleToken, final String clientId) {
        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new JacksonFactory();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(clientId))
                .build();
        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(googleToken);
        } catch (GeneralSecurityException | IOException e) {
            logger.fatal("Unable to read google token.", e);
        }
        if (idToken != null) {
            return idToken.getPayload();
        }
        return null;
    }

    @Transactional
    public User getUserByGoogleToken(String token, String role) throws WrongRoleSelectionException {
        final String CLIENT_ID = "899873551530-nq1cl62rki8ehf4qgc3dm8hnp9l5icvi.apps.googleusercontent.com";
        User user;
        GoogleIdToken.Payload payload = getGooglePayload(token, CLIENT_ID);

        String email = payload.getEmail();
        // creating username from the first part of the email address
        String username = email.split("@")[0];
        if (username.length() < 4) {
            username = username + new Random().nextInt(900) + 100;
        }
        String firstName = (String) payload.get("given_name");
        String lastName = (String) payload.get("family_name");
        // Later
        //   String name = (String) payload.get("name");
        //   String pictureUrl = (String) payload.get("picture");
        //   String locale = (String) payload.get("locale");

        user = getGoogleAuthenticatedUser(username, role);

        add(user);

        String currentRole = user.getAuthorities().get(0).split("_")[1];

        if (currentRole.equals(role)) {
            if (role.equals("STUDENT") || role.equals("TEACHER")) {
                try {
                    simpleUserService.add(username, email, firstName, lastName, null);
                } catch (WrongRoleSelectionException e) {
                    logger.info("Wrong role selection.");
                    throw new WrongRoleSelectionException();
                }
            } else if (role.equals("COMPANY")) {
                try {
                    // The default company name is the username
                    // and the default subscription value is 'later'
                    companyService.add(username, username, email, "later");
                } catch (WrongRoleSelectionException e) {
                    logger.info("Wrong role selection.");
                    throw new WrongRoleSelectionException();
                }
            }
        } else {
            logger.info("Wrong role selection.");
            throw new WrongRoleSelectionException();
        }
        return user;
    }

    public void update(Integer id, User usr) {
        User user = userRepository.getOne(id);
        user.setAll(usr);
        userRepository.save(user);
    }

    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

 */

    private enum Role {
        VISITOR(0),
        CUSTOMER(1);

        private final int value;

        Role(int value) {
            this.value = value;
        }

        public int getRole() {
            return this.value;
        }
    }
}
