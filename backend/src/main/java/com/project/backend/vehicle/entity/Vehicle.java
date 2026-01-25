package com.project.backend.vehicle.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

import com.project.backend.user.model.User;
import com.project.backend.vehicle.enums.VehicleStatus;

@Entity
@Table(name = "vehicles")
@Data
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic info
    private String company;
    private String model;
    private int year;
    private String transmission;
    private String fuel;
    private int seats;
    private double ratePerDay;
    private String description;

    // 🔥 Admin approval status
    @Enumerated(EnumType.STRING)
    private VehicleStatus status;   // PENDING, APPROVED, REJECTED

    // Verification / documents
    private String registrationNumber;
    private String rcNumber;
    private String insuranceExpiry;
    private String pucExpiry;
    private String chassisLast4;
    private String engineNumber;

    // Features
    @ElementCollection
    private List<String> features;

    // Vendor mapping
    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private User vendor;
}
