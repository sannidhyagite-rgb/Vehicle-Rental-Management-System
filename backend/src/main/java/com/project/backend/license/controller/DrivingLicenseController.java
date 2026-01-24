package com.project.backend.license.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.backend.license.dto.DrivingLicenseRequest;
import com.project.backend.license.dto.DrivingLicenseStatusResponse;
import com.project.backend.license.service.DrivingLicenseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/license")
@RequiredArgsConstructor
public class DrivingLicenseController {

    private final DrivingLicenseService licenseService;

    // Customer submits license
    @PostMapping
    public ResponseEntity<?> submitLicense(
            @RequestBody DrivingLicenseRequest request) {

        licenseService.submitLicense(request);
        return ResponseEntity.ok("License submitted successfully");
    }
    
    @GetMapping("/status")
    public ResponseEntity<DrivingLicenseStatusResponse> getMyLicenseStatus() {
        return ResponseEntity.ok(licenseService.getMyLicenseStatus());
    }


}
