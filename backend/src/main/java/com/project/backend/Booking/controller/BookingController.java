package com.project.backend.Booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.backend.Booking.DTO.BookingModifyDTO;
import com.project.backend.Booking.DTO.BookingResponseDTO;
import com.project.backend.Booking.DTO.BookingSummaryDTO;
import com.project.backend.Booking.Service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // Create Booking
    @PostMapping
    public BookingResponseDTO createBooking(@RequestBody com.project.backend.Booking.DTO.BookingRequestDTO request) {
        return bookingService.createBooking(request);
    }

    //  Summary cards
    @GetMapping("/summary")
    public BookingSummaryDTO getSummary() {
        return bookingService.getBookingSummary();
    }

    //  Upcoming bookings
    @GetMapping("/upcoming")
    public List<BookingResponseDTO> upcoming() {
        return bookingService.getUpcomingBookings();
    }

    //  Completed bookings
    @GetMapping("/completed")
    public List<BookingResponseDTO> completed() {
        return bookingService.getCompletedBookings();
    }

    //  View booking (READ)
    @GetMapping("/{bookingId}")
    public BookingResponseDTO getBooking(@PathVariable Long bookingId) {
        return bookingService.getBookingById(bookingId);
    }

    //  Get booking for MODIFY (EDIT)
    @GetMapping("/{bookingId}/edit")
    public BookingModifyDTO getBookingForModify(@PathVariable Long bookingId) {
        return bookingService.getBookingForModify(bookingId);
    }

    //  Update booking
    @PutMapping("/{bookingId}")
    public BookingModifyDTO updateBooking(
            @PathVariable Long bookingId,
            @RequestBody BookingModifyDTO dto
    ) {
        return bookingService.updateBooking(bookingId, dto);
    }

    //  Cancel booking
    @PutMapping("/{bookingId}/cancel")
    public void cancel(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }
}
