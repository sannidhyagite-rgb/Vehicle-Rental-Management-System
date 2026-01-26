package com.project.backend.user.controller;

import com.project.backend.user.dto.UpdateProfileRequest;
import com.project.backend.user.model.User;
import com.project.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Get logged-in user (ADMIN / CUSTOMER / VENDOR)
     */
    @GetMapping("/me")
    public User getCurrentUser(@AuthenticationPrincipal User user) {
        return user;
    }

    /**
     * Update profile (CUSTOMER)
     */
    @PutMapping("/me")
    public User updateProfile(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateProfileRequest request
    ) {
        return userService.updateProfile(user.getEmail(), request);
    }
}
