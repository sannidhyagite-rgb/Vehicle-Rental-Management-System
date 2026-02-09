package com.project.backend.Payment.Service;

import java.util.Map;

import org.json.JSONObject;

import com.razorpay.RazorpayException;

public interface PaymentService {

    // Create Razorpay order
    JSONObject createOrder(double amount) throws RazorpayException;

    // Verify Razorpay signature only
    boolean verify(String orderId, String paymentId, String signature);

    // Verify payment AND save to DB
    void verifyAndSavePayment(Map<String, String> data);
}