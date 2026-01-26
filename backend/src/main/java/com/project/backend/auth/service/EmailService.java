package com.project.backend.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    /**
     * Send OTP email asynchronously so API never hangs
     */
    @Async
    public void sendOtp(String to, String otp) {

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Your DriveNow OTP");
            message.setText(
                "Your OTP is: " + otp + "\n\n" +
                "This OTP is valid for 5 minutes.\n\n" +
                "— DriveNow Team"
            );

            mailSender.send(message);

        } catch (Exception e) {
            // IMPORTANT: never throw exception from async mail
            System.err.println("Failed to send OTP email: " + e.getMessage());
        }
    }
}
