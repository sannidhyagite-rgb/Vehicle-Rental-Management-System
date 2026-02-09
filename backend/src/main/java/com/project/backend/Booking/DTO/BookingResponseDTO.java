package com.project.backend.Booking.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.backend.Booking.Enum.BookingStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingResponseDTO {

    private Long bookingId;

    // =========================
    // VEHICLE INFO
    // =========================
    private Long vehicleId;
    private String vehicleName;
    private Double ratePerDay;

    // =========================
    // BOOKING TIME
    // =========================
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime pickupDateTime;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime returnDateTime;

    // =========================
    // LOCATION INFO
    // =========================
    private String city;
    private String address;

    // =========================
    // PAYMENT INFO
    // =========================
    private BigDecimal totalAmount;

    private BookingStatus status;
}
