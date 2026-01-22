package com.project.backend.license.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.backend.common.util.CurrentUserUtil;
import com.project.backend.license.dto.DrivingLicenseRequest;
import com.project.backend.license.dto.DrivingLicenseStatusResponse;
import com.project.backend.license.entity.DrivingLicense;
import com.project.backend.license.entity.LicenseStatus;
import com.project.backend.license.repository.DrivingLicenseRepository;
import com.project.backend.user.model.User;
import com.project.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DrivingLicenseService {

    private final DrivingLicenseRepository licenseRepository;
    private final UserRepository userRepository;

    // ===============================
    // CUSTOMER: Submit Driving License
    // ===============================
    public void submitLicense(DrivingLicenseRequest request) {

        String email = CurrentUserUtil.getLoggedInEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (licenseRepository.existsByUser(user)) {
            throw new RuntimeException("Driving license already submitted");
        }

        validateLicense(request);

        DrivingLicense license = DrivingLicense.builder()
                .user(user)
                .licenseNumber(request.getLicenseNumber())
                .dateOfBirth(request.getDateOfBirth())
                .issueDate(request.getIssueDate())
                .expiryDate(request.getExpiryDate())
                .licenseType(request.getLicenseType())
                .status(LicenseStatus.PENDING)   // ✅ ENUM BASED
                .build();

        licenseRepository.save(license);
    }

    // ===============================
    // CORE VALIDATION LOGIC (BACKEND)
    // ===============================
    private void validateLicense(DrivingLicenseRequest request) {

        // 1️⃣ Age check (18+)
        int age = Period.between(request.getDateOfBirth(), LocalDate.now()).getYears();
        if (age < 18) {
            throw new RuntimeException("User must be at least 18 years old");
        }

        // 2️⃣ Date consistency
        if (request.getIssueDate().isAfter(request.getExpiryDate())) {
            throw new RuntimeException("License issue date cannot be after expiry date");
        }

        // 3️⃣ Expiry check
        if (request.getExpiryDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Driving license is expired");
        }
    }

    // ===============================
    // CUSTOMER: Get My License Status
    // ===============================
    public DrivingLicenseStatusResponse getMyLicenseStatus() {

        String email = CurrentUserUtil.getLoggedInEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return licenseRepository.findByUser(user)
                .map(license -> DrivingLicenseStatusResponse.builder()
                        .submitted(true)
                        .status(license.getStatus().name())
                        .message(getStatusMessage(license.getStatus()))
                        .build())
                .orElse(DrivingLicenseStatusResponse.builder()
                        .submitted(false)
                        .status("NOT_SUBMITTED")
                        .message("Driving license not submitted")
                        .build());
    }

    private String getStatusMessage(LicenseStatus status) {
        switch (status) {
            case APPROVED:
                return "Driving license verified. You can book vehicles.";
            case REJECTED:
                return "Driving license rejected. Please contact support.";
            case PENDING:
            default:
                return "Driving license under verification.";
        }
    }

    // ===============================
    // ADMIN: Verify Driving License
    // ===============================
    public void verifyLicense(Long licenseId, boolean approve) {

        DrivingLicense license = licenseRepository.findById(licenseId)
                .orElseThrow(() -> new RuntimeException("Driving license not found"));

        if (approve) {
            license.setStatus(LicenseStatus.APPROVED);
            license.setVerifiedAt(LocalDateTime.now());
        } else {
            license.setStatus(LicenseStatus.REJECTED);
            license.setVerifiedAt(LocalDateTime.now());
        }

        licenseRepository.save(license);
    }

    // ===============================
    // ADMIN: View Pending Licenses
    // ===============================
    public List<DrivingLicense> getPendingLicenses() {
        return licenseRepository.findByStatus(LicenseStatus.PENDING);
    }
}
