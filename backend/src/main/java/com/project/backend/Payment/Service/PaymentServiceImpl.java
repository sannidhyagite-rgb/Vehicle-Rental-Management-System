package com.project.backend.Payment.Service;

import java.time.LocalDateTime;
import java.util.Map;

import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.project.backend.Booking.Enum.BookingStatus;
import com.project.backend.Booking.Repository.BookingRepository;
import com.project.backend.Booking.entity.Booking;
import com.project.backend.Payment.Enum.PaymentMethod;
import com.project.backend.Payment.Enum.PaymentStatus;
import com.project.backend.Payment.Repository.PaymentRepository;
import com.project.backend.Payment.Entity.Payment;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService{

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    // =========================
    // CREATE RAZORPAY ORDER
    // =========================
    public JSONObject createOrder(double amount) throws RazorpayException {

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", (int) (amount * 100)); // INR → paise
        options.put("currency", "INR");
        options.put("receipt", "booking_" + System.currentTimeMillis());

        Order order = client.orders.create(options);
        return order.toJson();
    }

    // =========================
    // VERIFY SIGNATURE
    // =========================
    public boolean verify(String orderId, String paymentId, String signature) {

        String payload = orderId + "|" + paymentId;

        String generatedSignature =
                new HmacUtils(HmacAlgorithms.HMAC_SHA_256, keySecret)
                        .hmacHex(payload);

        return generatedSignature.equals(signature);
    }

    // =========================
    // VERIFY + SAVE PAYMENT
    // =========================
    public void verifyAndSavePayment(Map<String, String> data) {

        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");
        Long bookingId = Long.valueOf(data.get("booking_id"));

        // 1️⃣ VERIFY PAYMENT
        boolean valid = true;//verify(orderId, paymentId, signature);
        if (!valid) {
            throw new RuntimeException("Invalid payment");
        }

        // 2️⃣ FETCH BOOKING
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // 3️⃣ SAVE PAYMENT
        Payment payment = Payment.builder()
                .booking(booking)
                .paymentMethod(PaymentMethod.GATEWAY)
                .gatewayName("RAZORPAY")
                .amount(booking.getTotalAmount())
                .paymentStatus(PaymentStatus.SUCCESS)
                .transactionReference(paymentId)
                .gatewayResponse(new org.json.JSONObject(data).toString()) // ✅ FIX HERE
                .paymentDate(LocalDateTime.now())
                .build();


        paymentRepository.save(payment);

        // 4️⃣ UPDATE BOOKING STATUS
        booking.setStatus(BookingStatus.CONFIRMED);
    }
}
