package com.project.backend.vehicle.dto;

import lombok.Data;

@Data
public class AdminVehicleResponseDTO {

    private Long id;

    // Vehicle info
    private String company;
    private String model;
    private int year;
    private String fuel;
    private String transmission;
    private int seats;
    private double ratePerDay;

    // Admin workflow
    private String status;   // PENDING / APPROVED / REJECTED

    // Vendor info
    private String vendorName;
    private String vendorEmail;
}
