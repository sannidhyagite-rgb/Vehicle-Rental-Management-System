import api from "./axios";

// Create Order (Backend calls Razorpay)
export const createOrder = (amount) => {
    return api.post("/payment/create-order", null, {
        params: { amount },
    });
};

// Verify Payment (Backend verifies signature)
export const verifyPayment = (paymentData) => {
    return api.post("/payment/verify", paymentData);
};
