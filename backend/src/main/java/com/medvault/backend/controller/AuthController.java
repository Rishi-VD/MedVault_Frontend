package com.medvault.backend.controller;

import com.medvault.backend.dto.LoginDto;
import com.medvault.backend.dto.UserDto;
import com.medvault.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDto userDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.toList()));
        }
        try {
            if (userService.register(userDto)) {
                return ResponseEntity.ok("User registered successfully");
            } else {
                return new ResponseEntity<>("User with this email already exists", HttpStatus.CONFLICT);
            }
        } catch (IOException e) {
            return new ResponseEntity<>("Error saving user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.toList()));
        }
        try {
            if (userService.login(loginDto)) {
                return ResponseEntity.ok("User logged in successfully");
            } else {
                return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }
        } catch (IOException e) {
            return new ResponseEntity<>("Error logging in", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
