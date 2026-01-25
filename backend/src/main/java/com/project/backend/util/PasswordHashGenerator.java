//package com.project.backend.util;
//
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class PasswordHashGenerator {
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @PostConstruct
//    public void generateAdminPassword() {
//        System.out.println("ADMIN PASSWORD HASH:");
//        System.out.println(passwordEncoder.encode("Admin@123"));
//        System.out.println(passwordEncoder.encode("Test"));
//        System.out.println(passwordEncoder.encode("Admin"));
//    }
//}
