package com.project.backend.vehicle.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import com.project.backend.user.model.User;

@Entity
@Table(name = "vehicles")
@Data
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String model;
    private int year;
    private String transmission;
    private String fuel;
    private int seats;
    private double ratePerDay;
    private String description;

    private String status; // AVAILABLE, RENTED

    // verification
    private String registrationNumber;
    private String rcNumber;
    private String insuranceExpiry;
    private String pucExpiry;
    private String chassisLast4;
    private String engineNumber;

    // features (ABS, AC, BT etc.)
    @ElementCollection
    private List<String> features;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private User vendor;
}
