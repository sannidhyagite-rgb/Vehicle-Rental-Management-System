package com.project.backend.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.backend.auth.entity.OtpVerification;

import java.util.Optional;

public interface OtpVerificationRepository 
        extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findByMobileNumber(String mobileNumber);

    void deleteByMobileNumber(String mobileNumber);
}
