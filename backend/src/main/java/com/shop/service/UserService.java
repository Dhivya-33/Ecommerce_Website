package com.shop.service;

import com.shop.model.User;
import com.shop.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {
        // Create default admin if not exists
        if (userRepository.findByEmail("admin@shopwave.com").isEmpty()) {
            User admin = new User(null, "admin", "admin@shopwave.com",
                    passwordEncoder.encode("admin123"), "ADMIN");
            userRepository.save(admin);
        }
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User register(String username, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User(null, username, email,
                passwordEncoder.encode(password), "USER");
        return userRepository.save(user);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPasswordHash());
    }
}
