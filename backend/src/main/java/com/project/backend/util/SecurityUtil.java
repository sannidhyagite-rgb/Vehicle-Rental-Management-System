package com.project.backend.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.project.backend.user.model.User;

@Component
public class SecurityUtil {

    public String getCurrentUserEmail() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthenticated");
        }

        Object principal = authentication.getPrincipal();

        // ✅ CASE 1: JWT filter stored User entity
        if (principal instanceof User user) {
            return user.getEmail();
        }

        // ✅ CASE 2: Spring stored email as String
        if (principal instanceof String email) {
            return email;
        }

        throw new RuntimeException(
                "Invalid principal type: " + principal.getClass().getName()
        );
    }
}
