package com.project.backend.auth.repository;

import com.project.backend.auth.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpVerificationRepository
extends JpaRepository<OtpVerification, Long> {

Optional<OtpVerification> findByMobileNumber(String mobileNumber);

void deleteByMobileNumber(String mobileNumber);
}



