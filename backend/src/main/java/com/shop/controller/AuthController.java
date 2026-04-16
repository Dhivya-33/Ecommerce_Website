package com.shop.controller;

import com.shop.config.JwtUtil;
import com.shop.dto.AuthResponse;
import com.shop.dto.LoginRequest;
import com.shop.dto.RegisterRequest;
import com.shop.model.User;
import com.shop.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            @RequestBody Map<String, String> payload,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        String email = payload.get("email");
        String password = payload.get("password");
        
        User updated = userService.updateProfile(userDetails.getUsername(), email, password);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return userService.findByEmail(request.getEmail())
                .filter(user -> userService.checkPassword(user, request.getPassword()))
                .map(user -> {
                    String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
                    return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole()));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Invalid email or password")));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.register(
                    request.getUsername(),
                    request.getEmail(),
                    request.getPassword()
            );
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse(token, user.getUsername(), user.getRole()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
