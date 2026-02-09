import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

function LoginOtp() {
  const [identifier, setIdentifier] = useState(""); // email or mobile
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    if (!identifier) {
      alert("Please enter email or mobile number");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await api.post("/auth/otp/send", {
        identifier,
      });

      setStep(2);
      setMessage("OTP has been sent to your registered email.");
    } catch (err) {
      alert(err.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/otp/verify", {
        identifier,
        otp,
      });

      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "CUSTOMER") {
        navigate("/customerdashboard", { replace: true });
      } else if (role === "VENDOR") {
        navigate("/vendor/dashboard", { replace: true });
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      alert(err.response?.data || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h4 className="text-center mb-3">Login with OTP</h4>

        {/* STEP 1: IDENTIFIER */}
        {step === 1 && (
          <>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter email or mobile number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <button
              className="btn btn-primary w-100"
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <p className="text-success text-center small mb-2">
              {message}
            </p>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              className="btn btn-success w-100"
              onClick={verifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              className="btn btn-link w-100 mt-2"
              onClick={() => {
                setStep(1);
                setOtp("");
              }}
            >
              Change email / mobile
            </button>
          </>
        )}

        {/* REGISTER LINK - Merged from booking-backend */}
        <div className="text-center mt-3">
          <small>
            Don't have an account? <a href="/signup" className="text-decoration-none">Register here</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginOtp;
