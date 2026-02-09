package com.project.backend.Booking.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.project.backend.Booking.DTO.BookingModifyDTO;
import com.project.backend.Booking.DTO.BookingResponseDTO;
import com.project.backend.Booking.DTO.BookingSummaryDTO;
import com.project.backend.Booking.Enum.BookingStatus;
import com.project.backend.Booking.Repository.BookingRepository;
import com.project.backend.Booking.entity.Booking;
import com.project.backend.user.repository.UserRepository;
import com.project.backend.util.SecurityUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final com.project.backend.vehicle.repository.VehicleRepository vehicleRepository;
    private final SecurityUtil securityUtil;
    private final ModelMapper modelMapper;
    
    private BookingResponseDTO mapToResponseDTO(Booking b) {
        BookingResponseDTO dto = modelMapper.map(b, BookingResponseDTO.class);

        // Vehicle
        dto.setVehicleId(b.getVehicle().getId());
        dto.setVehicleName(b.getVehicle().getModel());
        dto.setRatePerDay(b.getVehicle().getRatePerDay());

        // Location (ENTITY → DTO)
        if (b.getVehicle().getLocation() != null) {
            dto.setCity(b.getVehicle().getLocation().getCity());
            dto.setAddress(b.getVehicle().getLocation().getAddress());
        }

        // Amount
        dto.setTotalAmount(b.getTotalAmount());

        return dto;
    }


    // =========================
    //  CURRENT USER ID (JWT)
    // =========================
    private Long getCurrentUserId() {
        String email = securityUtil.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getUserId();
    }

    // =========================
    //  CREATE BOOKING
    // =========================
    @Override
    public BookingResponseDTO createBooking(com.project.backend.Booking.DTO.BookingRequestDTO request) {
        Long userId = getCurrentUserId();

        com.project.backend.user.model.User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.project.backend.vehicle.entity.Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // Validate dates
        if (request.getPickupDateTime().isAfter(request.getReturnDateTime())) {
            throw new RuntimeException("Pickup date must be before return date");
        }

        // Calculate Days
        long days = Duration.between(request.getPickupDateTime(), request.getReturnDateTime()).toDays();
        if (days <= 0) days = 1;

        BigDecimal totalAmount = BigDecimal.valueOf(days * vehicle.getRatePerDay());

        Booking booking = Booking.builder()
                .customer(user)
                .vehicle(vehicle)
                .createdAt(java.time.LocalDateTime.now())
                .pickupDateTime(request.getPickupDateTime())
                .returnDateTime(request.getReturnDateTime())
                .totalAmount(totalAmount)
                .status(BookingStatus.PENDING) // Initial status
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        return mapToResponseDTO(savedBooking);
    }

    // =========================
    //  BOOKING SUMMARY
    // =========================
    @Override
    public BookingSummaryDTO getBookingSummary() {

        Long userId = getCurrentUserId();

        //  UPCOMING = UPCOMING + CONFIRMED
        long upcoming = bookingRepository.countByCustomer_UserIdAndStatusIn(
                userId,
                List.of(BookingStatus.UPCOMING, BookingStatus.CONFIRMED)
        );

        long completed = bookingRepository.countByCustomer_UserIdAndStatus(
                userId,
                BookingStatus.COMPLETED
        );

        Double totalSpent = bookingRepository.getTotalSpent(userId);

        return new BookingSummaryDTO(
                upcoming,
                completed,
                totalSpent == null ? 0.0 : totalSpent
        );
    }

    // =========================
    //  UPCOMING BOOKINGS
    // =========================
    @Override
    public List<BookingResponseDTO> getUpcomingBookings() {

        Long userId = getCurrentUserId();

        return bookingRepository
                .findUpcomingBookingsWithVehicle(
                        userId,
                        List.of(BookingStatus.UPCOMING, BookingStatus.CONFIRMED)
                )
                .stream()
                .map(this::mapToResponseDTO)
                .toList();

    }


    // =========================
    //  COMPLETED BOOKINGS
    // =========================
    @Override
    public List<BookingResponseDTO> getCompletedBookings() {

        Long userId = getCurrentUserId();

        return bookingRepository
                .findCompletedBookingsWithVehicle(
                        userId,
                        List.of(BookingStatus.COMPLETED, BookingStatus.CANCELLED)
                )
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }


    // =========================
    //  VIEW BOOKING
    // =========================
    @Override
    public BookingResponseDTO getBookingById(Long bookingId) {

        Long userId = getCurrentUserId();

        Booking booking = bookingRepository
                .findByBookingIdAndCustomer_UserId(bookingId, userId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return mapToResponseDTO(booking);   //  HERE

    }

    // =========================
    //  CANCEL BOOKING
    // =========================
    @Override
    public void cancelBooking(Long bookingId) {

        Long userId = getCurrentUserId();

        Booking booking = bookingRepository
                .findByBookingIdAndCustomer_UserId(bookingId, userId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new RuntimeException("Completed booking cannot be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
    }

    // =========================
    //  GET BOOKING FOR MODIFY
    // =========================
    @Override
    public BookingModifyDTO getBookingForModify(Long bookingId) {

        Long userId = getCurrentUserId();

        Booking booking = bookingRepository
                .findByBookingIdAndCustomer_UserId(bookingId, userId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        BookingModifyDTO dto = new BookingModifyDTO();
        dto.setBookingId(booking.getBookingId());
        dto.setPickupDateTime(booking.getPickupDateTime());
        dto.setReturnDateTime(booking.getReturnDateTime());
        dto.setTotalAmount(booking.getTotalAmount());

        return dto;
    }

    // =========================
    //  UPDATE BOOKING
    // =========================
    @Override
    public BookingModifyDTO updateBooking(Long bookingId, BookingModifyDTO dto) {

        Long userId = getCurrentUserId();

        Booking booking = bookingRepository
                .findByBookingIdAndCustomer_UserId(bookingId, userId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new RuntimeException("Completed booking cannot be modified");
        }

        if (dto.getPickupDateTime() == null || dto.getReturnDateTime() == null) {
            throw new IllegalArgumentException("Pickup and return datetime are required");
        }

        booking.setPickupDateTime(dto.getPickupDateTime());
        booking.setReturnDateTime(dto.getReturnDateTime());

        long days = Duration
                .between(dto.getPickupDateTime(), dto.getReturnDateTime())
                .toDays();

        if (days <= 0) {
            days = 1;
        }

        BigDecimal newTotal =
                BigDecimal.valueOf(days * booking.getVehicle().getRatePerDay());

        booking.setTotalAmount(newTotal);
        dto.setTotalAmount(newTotal);

        return dto;
    }
}
