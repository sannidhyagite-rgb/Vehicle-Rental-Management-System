package com.project.backend.auth.dto;

import com.project.backend.user.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
	private String fullName;
	private String email;
	private String password;
	private String mobileNumber;
	private String city;
	private UserRole role;

}
