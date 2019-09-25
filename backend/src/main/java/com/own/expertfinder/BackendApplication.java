package com.own.expertfinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;

import javax.annotation.Resource;
import javax.sql.DataSource;

@SpringBootApplication
public class BackendApplication extends WebSecurityConfigurerAdapter  { // implements CommandLineRunner ?

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}


    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    UserDetailsManager userDetailsManager(
            @Autowired DataSource dataSource,
            @Autowired JdbcTemplate jdbcTemplate,
            @Autowired AuthenticationManager authenticationManager) {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager();
        userDetailsManager.setJdbcTemplate(jdbcTemplate);
        userDetailsManager.setDataSource(dataSource);
        // Using AuthenticationManager re-authenticates the session on password change.
        userDetailsManager.setAuthenticationManager(authenticationManager);
        return userDetailsManager;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
