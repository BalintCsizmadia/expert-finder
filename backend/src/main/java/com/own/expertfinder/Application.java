package com.own.expertfinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;

import javax.sql.DataSource;

@SpringBootApplication
public class Application extends WebSecurityConfigurerAdapter  { // implements CommandLineRunner ?

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
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

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/auth/**", "/**").permitAll()
               /*
                .antMatchers(HttpMethod.POST, "/course-student", "/course-checkout", "/course-exam/**", "/student-answers/**").hasAnyAuthority("ROLE_STUDENT")
                .antMatchers(HttpMethod.GET,"/exanswers/**").hasAnyAuthority("ROLE_STUDENT")
                .antMatchers(HttpMethod.POST, "/add-course", "/courses/**", "/course-edit/**", "/add-course/**").hasAnyAuthority("ROLE_TEACHER")
                // company must access /courses/** endpoint because they can see the user's profile where is his/her courses. SHT
                .antMatchers(HttpMethod.GET, "/company/**", "/courses/**",  "/advertisements/**").hasAnyAuthority("ROLE_COMPANY")
                .antMatchers(HttpMethod.POST, "/advertisements/**").hasAnyAuthority("ROLE_COMPANY")
                .antMatchers(HttpMethod.DELETE, "/advertisements/**").hasAnyAuthority("ROLE_COMPANY")
                .antMatchers(HttpMethod.GET, "/home", "/courses/**").hasAnyAuthority("ROLE_STUDENT", "ROLE_TEACHER")
                .antMatchers("/posts/**", "/comments/**", "/post-topics/**", "/users/**", "/all-users", "/profile", "/vote", "/votes", "/votes/**").hasAnyAuthority("ROLE_STUDENT", "ROLE_TEACHER", "ROLE_COMPANY")
                .antMatchers("/**").hasAnyAuthority("ROLE_ADMIN")
                */
                .anyRequest().authenticated()
                .and()
                .httpBasic();
    }

}
