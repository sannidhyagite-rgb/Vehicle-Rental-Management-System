package com.project.backend.license.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.license.dto.LicenseVerificationRequest;
import com.project.backend.license.service.DrivingLicenseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/licenses")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminLicenseController {

    private final DrivingLicenseService licenseService;

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingLicenses() {
        return ResponseEntity.ok(licenseService.getPendingLicenses());
    }

    @PutMapping("/{licenseId}/verify")
    public ResponseEntity<?> verifyLicense(
            @PathVariable Long licenseId,
            @RequestBody LicenseVerificationRequest request) {

        licenseService.verifyLicense(licenseId, request.isApprove());
        return ResponseEntity.ok("License verification updated");
    }
}
