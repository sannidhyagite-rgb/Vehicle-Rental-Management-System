package com.project.backend.vehicle.entity;

import com.project.backend.vehicle.enums.VehicleBookingStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

import com.project.backend.user.model.User;
import com.project.backend.vehicle.enums.VehicleStatus;
import com.project.backend.vehicle.enums.TransmissionType;
import com.project.backend.vehicle.enums.FuelType;
import com.project.backend.vehicle.enums.CarType;

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

    @Enumerated(EnumType.STRING)
    private TransmissionType transmission;

    @Enumerated(EnumType.STRING)
    private FuelType fuel;

    @Enumerated(EnumType.STRING)
    private CarType carType;

    private int seats;
    private double ratePerDay;
    private String description;

    // 🔥 Admin approval status
    @Enumerated(EnumType.STRING)
    private VehicleStatus status;   // PENDING, APPROVED, REJECTED

    @Enumerated(EnumType.STRING)
    private VehicleBookingStatus booking_status; // AVAILABLE, BOOKED

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

    @PrePersist
    public void setDefaultValues() {

        if (this.status == null) {
            this.status = VehicleStatus.PENDING;
        }

        if (this.booking_status == null) {
            this.booking_status = VehicleBookingStatus.AVAILABLE;
        }
    }
}
