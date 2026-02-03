package com.project.backend.Booking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingSummaryDTO {

    private long upcomingCount;
    private long completedCount;
    private double totalSpent;
}
