package com.project.backend.auth.service;

import com.project.backend.auth.entity.OtpVerification;
import com.project.backend.auth.repository.OtpVerificationRepository;
import com.project.backend.user.model.User;
import com.project.backend.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
public class OtpService {

    private final OtpVerificationRepository otpRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder; // ✅ FIX

    private static final int MAX_ATTEMPTS = 3;

    /* =========================
       GENERATE OTP
       ========================= */
    public void generateOtp(String identifier) {

        // 1️⃣ Fetch user by email or mobile
        User user = identifier.contains("@")
                ? userRepository.findByEmail(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found"))
                : userRepository.findByMobileNumber(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Generate OTP
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        // 3️⃣ Remove previous OTP
        otpRepository.deleteByMobileNumber(user.getMobileNumber());

        // 4️⃣ Save OTP
        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setIdentifier(identifier);
        otpEntity.setMobileNumber(user.getMobileNumber());
        otpEntity.setOtpHash(passwordEncoder.encode(otp)); // ✅ HASHED
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpEntity.setAttempts(0);
        otpEntity.setBlocked(false);
        otpEntity.setVerified(false);
        otpEntity.setCreatedAt(LocalDateTime.now());

        otpRepository.save(otpEntity);

        // 5️⃣ Send OTP via email
        emailService.sendOtp(user.getEmail(), otp);
    }

    /* =========================
       VERIFY OTP
       ========================= */
    public void verifyOtp(String identifier, String otp) {

        // 1️⃣ Fetch user
        User user = identifier.contains("@")
                ? userRepository.findByEmail(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found"))
                : userRepository.findByMobileNumber(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Fetch OTP record
        OtpVerification otpData = otpRepository.findByMobileNumber(user.getMobileNumber())
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        // 3️⃣ Blocked check
        if (otpData.isBlocked()) {
            throw new RuntimeException("OTP blocked due to multiple failures");
        }

        // 4️⃣ Expiry check
        if (otpData.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpRepository.deleteByMobileNumber(user.getMobileNumber());
            throw new RuntimeException("OTP expired");
        }

        // 5️⃣ Verify OTP (HASHED)
        if (!passwordEncoder.matches(otp, otpData.getOtpHash())) {
            otpData.setAttempts(otpData.getAttempts() + 1);

            if (otpData.getAttempts() >= MAX_ATTEMPTS) {
                otpData.setBlocked(true);
            }

            otpRepository.save(otpData);
            throw new RuntimeException("Invalid OTP");
        }

        // 6️⃣ Success
        otpRepository.deleteByMobileNumber(user.getMobileNumber());
    }
}
