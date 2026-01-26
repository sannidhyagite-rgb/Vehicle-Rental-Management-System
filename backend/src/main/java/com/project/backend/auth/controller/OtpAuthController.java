package com.project.backend.auth.controller;

import com.project.backend.auth.dto.LoginResponse;
import com.project.backend.auth.dto.SendOtpRequest;
import com.project.backend.auth.dto.VerifyOtpRequest;
import com.project.backend.auth.service.AuthService;
import com.project.backend.auth.service.OtpService;
import com.project.backend.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth/otp")
@RequiredArgsConstructor
public class OtpAuthController {

    private final OtpService otpService;
    private final AuthService authService;

    /* =========================
       SEND OTP
       ========================= */
    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpRequest request) {

        otpService.generateOtp(request.getIdentifier());

        return ResponseEntity.ok(
                Map.of("message", "OTP sent successfully")
        );
    }

    /* =========================
       VERIFY OTP
       ========================= */
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request) {

        otpService.verifyOtp(
                request.getIdentifier(),
                request.getOtp()
        );

        LoginResponse loginResponse =
                authService.loginWithOtp(request.getIdentifier());

        User user =
                authService.getUserByIdentifier(request.getIdentifier());

        return ResponseEntity.ok(
                Map.of(
                        "token", loginResponse.getToken(),
                        "role", user.getRole().name()
                )
        );
    }
}
