package com.project.backend.Booking.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.backend.Booking.Enum.BookingStatus;
import com.project.backend.Booking.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // =====================================================
    // 1️ UPCOMING BOOKINGS (UPCOMING + CONFIRMED)
    // WITH VEHICLE + LOCATION
    // =====================================================
	@Query("""
		    SELECT b
		    FROM Booking b
		    JOIN FETCH b.vehicle v
		    JOIN b.customer c
		    WHERE c.userId = :userId
		      AND b.status IN :statuses
		""")
		List<Booking> findUpcomingBookingsWithVehicle(
		        @Param("userId") Long userId,
		        @Param("statuses") List<BookingStatus> statuses
		);


    // =====================================================
    // 2️ COMPLETED BOOKINGS (WITH VEHICLE + LOCATION)
    // =====================================================
	@Query("""
		    SELECT b
		    FROM Booking b
		    JOIN FETCH b.vehicle v
		    JOIN b.customer c
		    WHERE c.userId = :userId
		      AND b.status IN :statuses
		""")
		List<Booking> findCompletedBookingsWithVehicle(
		        @Param("userId") Long userId,
		        @Param("statuses") List<BookingStatus> statuses
		);


    // =====================================================
    // 3️ COUNT BY STATUS
    // =====================================================
    long countByCustomer_UserIdAndStatus(
            Long userId,
            BookingStatus status
    );

    long countByCustomer_UserIdAndStatusIn(
            Long userId,
            List<BookingStatus> statuses
    );

    // =====================================================
    // 4️ TOTAL AMOUNT SPENT (COMPLETED ONLY)
    // =====================================================
    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Booking b
        JOIN b.customer c
        WHERE c.userId = :userId
          AND b.status = com.project.backend.Booking.Enum.BookingStatus.COMPLETED
    """)
    Double getTotalSpent(
            @Param("userId") Long userId
    );

    // =====================================================
    // 5️ GET SINGLE BOOKING BY ID (OWNER ONLY)
    // WITH VEHICLE + LOCATION
    // =====================================================
    @Query("""
        SELECT b
        FROM Booking b
        JOIN FETCH b.vehicle v
        LEFT JOIN FETCH b.location l
        JOIN b.customer c
        WHERE b.bookingId = :bookingId
          AND c.userId = :userId
    """)
    Optional<Booking> findByBookingIdAndCustomer_UserId(
            @Param("bookingId") Long bookingId,
            @Param("userId") Long userId
    );
}
