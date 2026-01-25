package com.project.backend.license.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Optional;

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
    // CUSTOMER: Submit / Resubmit Driving License
    // ===============================
    public void submitLicense(DrivingLicenseRequest request) {

        String email = CurrentUserUtil.getLoggedInEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<DrivingLicense> existingOpt = licenseRepository.findByUser(user);

        validateLicense(request);

        // 🔥 CASE 1: License already exists
        if (existingOpt.isPresent()) {
            DrivingLicense existing = existingOpt.get();

            // ❌ Block if PENDING or APPROVED
            if (existing.getStatus() == LicenseStatus.PENDING ||
                existing.getStatus() == LicenseStatus.APPROVED) {

                throw new RuntimeException("Driving license already submitted");
            }

            // ✅ Allow resubmission if REJECTED
            if (existing.getStatus() == LicenseStatus.REJECTED) {

                existing.setLicenseNumber(request.getLicenseNumber());
                existing.setDateOfBirth(request.getDateOfBirth());
                existing.setIssueDate(request.getIssueDate());
                existing.setExpiryDate(request.getExpiryDate());
                existing.setLicenseType(request.getLicenseType());
                existing.setStatus(LicenseStatus.PENDING);
                existing.setVerifiedAt(null); // reset admin review time

                licenseRepository.save(existing);
                return;
            }
        }

        // 🔥 CASE 2: First-time submission
        DrivingLicense license = DrivingLicense.builder()
                .user(user)
                .licenseNumber(request.getLicenseNumber())
                .dateOfBirth(request.getDateOfBirth())
                .issueDate(request.getIssueDate())
                .expiryDate(request.getExpiryDate())
                .licenseType(request.getLicenseType())
                .status(LicenseStatus.PENDING)
                .build();

        licenseRepository.save(license);
    }

    // ===============================
    // CORE VALIDATION LOGIC
    // ===============================
    private void validateLicense(DrivingLicenseRequest request) {

        int age = Period.between(request.getDateOfBirth(), LocalDate.now()).getYears();
        if (age < 18) {
            throw new RuntimeException("User must be at least 18 years old");
        }

        if (request.getIssueDate().isAfter(request.getExpiryDate())) {
            throw new RuntimeException("License issue date cannot be after expiry date");
        }

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
        return switch (status) {
            case APPROVED -> "Driving license verified. You can book vehicles.";
            case REJECTED -> "Driving license rejected. Please resubmit.";
            case PENDING -> "Driving license under verification.";
        };
    }

    // ===============================
    // ADMIN: Verify Driving License
    // ===============================
    public void verifyLicense(Long licenseId, boolean approve) {

        DrivingLicense license = licenseRepository.findById(licenseId)
                .orElseThrow(() -> new RuntimeException("Driving license not found"));

        license.setStatus(approve ? LicenseStatus.APPROVED : LicenseStatus.REJECTED);
        license.setVerifiedAt(LocalDateTime.now());

        licenseRepository.save(license);
    }

    // ===============================
    // ADMIN: View Pending Licenses
    // ===============================
    public List<DrivingLicense> getPendingLicenses() {
        return licenseRepository.findByStatus(LicenseStatus.PENDING);
    }
}
