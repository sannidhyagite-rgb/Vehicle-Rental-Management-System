package com.project.backend.vehicle.entity;

import com.project.backend.vehicle.enums.VehicleBookingStatus;
import com.project.backend.vehicle.enums.VehicleStatus;
import com.project.backend.vehicle.enums.TransmissionType;
import com.project.backend.vehicle.enums.FuelType;
import com.project.backend.vehicle.enums.CarType;
import com.project.backend.user.model.User;
import com.project.backend.Location.entity.Location;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

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

    // Enums
    @Enumerated(EnumType.STRING)
    @Column(name = "transmission")
    private TransmissionType transmission;

    @Enumerated(EnumType.STRING)
    @Column(name = "fuel")
    private FuelType fuel;

    @Enumerated(EnumType.STRING)
    @Column(name = "car_type")
    private CarType carType;

    private int seats;

    @Column(name = "rate_per_day")
    private double ratePerDay;

    private String description;
    
    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    // Admin approval status
    @Enumerated(EnumType.STRING)
    private VehicleStatus status;   // PENDING, APPROVED, REJECTED

    // Booking status
    @Enumerated(EnumType.STRING)
    @Column(name = "booking_status")
    private VehicleBookingStatus bookingStatus; // AVAILABLE, BOOKED

    // Verification / documents
    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "rc_number")
    private String rcNumber;

    @Column(name = "insurance_expiry")
    private String insuranceExpiry;

    @Column(name = "puc_expiry")
    private String pucExpiry;

    @Column(name = "chassis_last4")
    private String chassisLast4;

    @Column(name = "engine_number")
    private String engineNumber;

    // Features
    @ElementCollection
    @CollectionTable(
        name = "vehicle_features",
        joinColumns = @JoinColumn(name = "vehicle_id")
    )
    @Column(name = "feature")
    private List<String> features;

    // Vendor mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private User vendor;

    // Default values
    @PrePersist
    public void setDefaultValues() {
        if (this.status == null) {
            this.status = VehicleStatus.PENDING;
        }
        if (this.bookingStatus == null) {
            this.bookingStatus = VehicleBookingStatus.AVAILABLE;
        }
    }
}
