package com.project.backend.Booking.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BookingModifyDTO {

    private Long bookingId;

    private LocalDateTime pickupDateTime;
    private LocalDateTime returnDateTime;

    private BigDecimal totalAmount;
}