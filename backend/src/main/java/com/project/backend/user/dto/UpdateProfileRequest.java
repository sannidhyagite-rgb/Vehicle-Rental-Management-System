package com.project.backend.user.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String fullName;
    private String mobileNumber;
    private String city;
}
