package com.project.backend.vehicle.dto;

import lombok.Data;

import java.util.List;

@Data
public class VendorVehicleResponseDTO {

    private Long id;
    private String title;
    private String subtitle;
    private String status;
    private double ratePerDay;
    private List<String> images;
}
