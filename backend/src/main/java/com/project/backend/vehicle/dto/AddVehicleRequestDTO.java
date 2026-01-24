package com.project.backend.vehicle.dto;

import lombok.Data;
import java.util.List;

@Data
public class AddVehicleRequestDTO {

    private String company;
    private String model;
    private int year;
    private String transmission;
    private String fuel;
    private int seats;
    private double ratePerDay;
    private String description;

    private String registrationNumber;
    private String rcNumber;
    private String insuranceExpiry;
    private String pucExpiry;
    private String chassisLast4;
    private String engineNumber;

    private List<String> features;
}
