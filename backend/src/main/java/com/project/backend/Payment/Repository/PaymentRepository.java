package com.project.backend.Payment.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.Payment.Entity.Payment;
import com.project.backend.Payment.Enum.PaymentStatus;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Find payment by Razorpay / gateway transaction reference
    Optional<Payment> findByTransactionReference(String transactionReference);

    // Get all payments for a booking
    List<Payment> findByBooking_BookingId(Long bookingId);

    // Get successful payments only
    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);
}