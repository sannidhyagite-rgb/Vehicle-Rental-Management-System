package com.project.backend.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendOtpRequest {
    private String identifier; // email or mobile
}
