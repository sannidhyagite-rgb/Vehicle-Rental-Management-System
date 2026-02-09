package com.project.backend.Payment.Controller;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.backend.Payment.Service.PaymentServiceImpl;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentServiceImpl paymentService;

    // =========================
    // CREATE ORDER
    // =========================
    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestParam double amount)
            throws RazorpayException {

        JSONObject order = paymentService.createOrder(amount);

        Map<String, Object> res = new HashMap<>();
        res.put("orderId", order.get("id"));
        res.put("amount", order.get("amount"));
        res.put("currency", order.get("currency"));

        return res;
    }

    // =========================
    // VERIFY & SAVE PAYMENT
    // =========================
    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody Map<String, String> data) {

        paymentService.verifyAndSavePayment(data);

        return ResponseEntity.ok("Payment verified and saved");
    }
}
