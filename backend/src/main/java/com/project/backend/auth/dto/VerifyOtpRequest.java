package com.project.backend.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyOtpRequest {
    private String identifier;
    private String otp;
}
