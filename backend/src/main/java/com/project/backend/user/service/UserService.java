package com.project.backend.user.service;

import org.springframework.stereotype.Service;

import com.project.backend.user.dto.UpdateProfileRequest;
import com.project.backend.user.model.User;
import com.project.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String email, UpdateProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setMobileNumber(request.getMobileNumber());
        user.setCity(request.getCity());

        return userRepository.save(user);
    }
}
