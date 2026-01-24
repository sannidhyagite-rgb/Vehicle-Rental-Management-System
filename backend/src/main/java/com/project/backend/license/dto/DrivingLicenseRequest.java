package com.project.backend.license.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class DrivingLicenseRequest {

    private String licenseNumber;
    private LocalDate dateOfBirth;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String licenseType;
}
