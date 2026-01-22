package com.project.backend.auth.service;

import com.project.backend.auth.entity.OtpVerification;
import com.project.backend.auth.repository.OtpVerificationRepository;
import com.project.backend.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Transactional
@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpVerificationRepository otpRepository;
    private final UserRepository userRepository;

    /* =========================
       GENERATE OTP
       ========================= */
    public String generateOtp(String mobileNumber) {

        // Check if user exists
        userRepository.findByMobileNumber(mobileNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        otpRepository.deleteByMobileNumber(mobileNumber);

        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setMobileNumber(mobileNumber);
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(otpEntity);

        // DEV ONLY
        return otp;
    }

    /* =========================
       VERIFY OTP
       ========================= */
    public void verifyOtp(String mobileNumber, String otp) {

        OtpVerification otpData = otpRepository.findByMobileNumber(mobileNumber)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (otpData.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpRepository.deleteByMobileNumber(mobileNumber);
            throw new RuntimeException("OTP expired");
        }

        if (!otpData.getOtp().equals(otp)) {
            otpData.setAttempts(otpData.getAttempts() + 1);
            otpRepository.save(otpData);
            throw new RuntimeException("Invalid OTP");
        }

        otpRepository.deleteByMobileNumber(mobileNumber);
    }
}
