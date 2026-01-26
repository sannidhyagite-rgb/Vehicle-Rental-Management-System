package com.project.backend.auth.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verification")
@Getter
@Setter
public class OtpVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ================= CORE ================= */

    @Column(name = "identifier", nullable = false)
    private String identifier; // email or mobile

    @Column(name = "mobile_number", nullable = false, length = 15)
    private String mobileNumber;

//    // DEV MODE (optional – you can remove later)
//    @Column(name = "otp", nullable = false, length = 6)
//    private String otp;

    // PROD MODE (preferred)
    @Column(name = "otp_hash", nullable = false)
    private String otpHash;

    /* ================= SECURITY ================= */

    @Column(nullable = false)
    private int attempts = 0;

    @Column(nullable = false)
    private boolean blocked = false;

    @Column(nullable = false)
    private boolean verified = false;

    /* ================= TIME ================= */

    @Column(name = "expiry_time", nullable = false)
    private LocalDateTime expiryTime;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /* ================= LIFECYCLE ================= */

    @PrePersist
    public void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.attempts < 0) {
            this.attempts = 0;
        }
    }
}
