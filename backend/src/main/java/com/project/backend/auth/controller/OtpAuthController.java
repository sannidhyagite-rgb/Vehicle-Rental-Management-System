package com.project.backend.auth.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.backend.auth.dto.LoginResponse;
import com.project.backend.auth.service.AuthService;
import com.project.backend.auth.service.OtpService;
import com.project.backend.user.model.User;

import lombok.RequiredArgsConstructor;

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
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> req) {

        String mobileNumber = req.get("mobileNumber");

        String otp = otpService.generateOtp(mobileNumber);

        // ⚠️ DEV MODE ONLY
        return ResponseEntity.ok(
                Map.of(
                        "message", "OTP sent successfully",
                        "otp", otp
                )
        );
    }

    /* =========================
       VERIFY OTP
       ========================= */
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {

        String mobileNumber = req.get("mobileNumber");
        String otp = req.get("otp");

        // 1️⃣ Verify OTP
        otpService.verifyOtp(mobileNumber, otp);

        // 2️⃣ Login using OTP (JWT generation)
        LoginResponse loginResponse = authService.loginWithOtp(mobileNumber);

        // 3️⃣ Get logged-in user (to fetch role)
        User user = authService.getUserByMobileNumber(mobileNumber);

        // 4️⃣ Return TOKEN + ROLE 🔥
        return ResponseEntity.ok(
                Map.of(
                        "token", loginResponse.getToken(),
                        "role", user.getRole().name()
                )
        );
    }
}
