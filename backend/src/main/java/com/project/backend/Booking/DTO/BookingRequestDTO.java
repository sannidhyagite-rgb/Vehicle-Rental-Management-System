package com.project.backend.Booking.DTO;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BookingRequestDTO {
    private Long vehicleId;
    private LocalDateTime pickupDateTime;
    private LocalDateTime returnDateTime;
}
