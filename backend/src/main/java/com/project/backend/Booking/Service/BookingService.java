package com.project.backend.Booking.Service;

import java.util.List;

import com.project.backend.Booking.DTO.BookingModifyDTO;
import com.project.backend.Booking.DTO.BookingResponseDTO;
import com.project.backend.Booking.DTO.BookingSummaryDTO;


public interface BookingService {

	BookingSummaryDTO getBookingSummary();

    BookingResponseDTO createBooking(com.project.backend.Booking.DTO.BookingRequestDTO request);

    List<BookingResponseDTO> getUpcomingBookings();

    List<BookingResponseDTO> getCompletedBookings();

    BookingResponseDTO getBookingById(Long bookingId);

    void cancelBooking(Long bookingId);
    BookingModifyDTO getBookingForModify(Long bookingId);
    BookingModifyDTO updateBooking(Long bookingId, BookingModifyDTO dto);

   
}