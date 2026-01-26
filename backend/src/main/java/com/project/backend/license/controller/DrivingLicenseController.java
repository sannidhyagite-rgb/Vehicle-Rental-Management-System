package com.project.backend.license.controller;

import com.project.backend.license.dto.DrivingLicenseRequest;
import com.project.backend.license.dto.DrivingLicenseStatusResponse;
import com.project.backend.license.service.DrivingLicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/license")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('CUSTOMER')")
public class DrivingLicenseController {

    private final DrivingLicenseService licenseService;

    /**
     * Customer submits driving license
     */
    @PostMapping
    public ResponseEntity<?> submitLicense(
            @RequestBody DrivingLicenseRequest request
    ) {
        licenseService.submitLicense(request);
        return ResponseEntity.ok("License submitted successfully");
    }

    /**
     * Get logged-in customer's license status
     */
    @GetMapping("/status")
    public ResponseEntity<DrivingLicenseStatusResponse> getMyLicenseStatus() {
        return ResponseEntity.ok(licenseService.getMyLicenseStatus());
    }
}
