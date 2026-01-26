package com.project.backend.user.controller;

import com.project.backend.user.dto.UpdateProfileRequest;
import com.project.backend.user.model.User;
import com.project.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('CUSTOMER')")
public class UserController {

    private final UserService userService;

    /**
     * Get logged-in customer's profile
     */
    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {
        return userService.getCurrentUser(authentication.getName());
    }

    /**
     * Update logged-in customer's profile
     */
    @PutMapping("/me")
    public User updateProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request
    ) {
        return userService.updateProfile(authentication.getName(), request);
    }
}
