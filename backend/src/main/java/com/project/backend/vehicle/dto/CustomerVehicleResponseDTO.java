package com.project.backend.vehicle.dto;

import lombok.Data;

@Data
public class CustomerVehicleResponseDTO {

    private Long id;
    private String company;
    private String model;
    private int year;
    private String fuel;
    private double ratePerDay;
    private String image; // base64 image
}
