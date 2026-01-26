package com.project.backend.vehicle.dto;

import com.project.backend.vehicle.enums.CarType;
import com.project.backend.vehicle.enums.FuelType;
import com.project.backend.vehicle.enums.TransmissionType;
import lombok.Data;
import java.util.List;

@Data
public class AddVehicleRequestDTO {

    private String company;
    private String model;
    private int year;
    private TransmissionType transmission;
    private FuelType fuel;
    private CarType carType;
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
