package com.project.backend.license.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DrivingLicenseStatusResponse {

    private boolean submitted;
    private String status;     // PENDING / APPROVED / REJECTED
    private String message;
}
