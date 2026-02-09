package com.project.backend.Booking.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.project.backend.Booking.Enum.BookingStatus;
import com.project.backend.Location.entity.Location;
import com.project.backend.vehicle.entity.Vehicle;
import com.project.backend.user.model.User;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    /* ===================== RELATIONSHIPS ===================== */

    // FK → users.user_id (role = CUSTOMER)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    // FK → vehicles.vehicle_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    /* ===================== BOOKING DETAILS ===================== */

    @Column(name = "pickup_datetime", nullable = false)
    private LocalDateTime pickupDateTime;

    @Column(name = "return_datetime", nullable = false)
    private LocalDateTime returnDateTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;   // Pending, Confirmed, Cancelled, Completed

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    /* ===================== AUDIT FIELDS ===================== */

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;


    /* ===================== JPA CALLBACKS ===================== */

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = BookingStatus.PENDING; // default
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
}
