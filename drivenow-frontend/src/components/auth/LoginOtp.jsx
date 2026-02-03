import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function LoginOtp() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔁 Resend OTP
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // 🔐 Remember Me (UI only)
  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();

  /* ================= AUTO REDIRECT IF LOGGED IN ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "CUSTOMER") {
        navigate("/customerdashboard", { replace: true });
      } else if (role === "VENDOR") {
        navigate("/vendor/dashboard", { replace: true });
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    if (!mobileNumber) {
      alert("Please enter mobile number");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/otp/send", { mobileNumber });

      // DEV ONLY
      setGeneratedOtp(res.data.otp);
      setShowToast(true);
      setShowOtpModal(true);

      // ⏱ Start resend timer
      setTimer(30);
      setCanResend(false);

      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

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
      const res = await api.post("/auth/otp/verify", {
        mobileNumber,
        otp,
      });

      const { token, role } = res.data;

      // 🔐 ALWAYS store in localStorage (axios reads from here)
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
      alert(err.response?.data || "Invalid OTP");
    }
  };

  return (
    <>
      {/* ================= LOGIN CARD ================= */}
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ width: "380px" }}>
          <h4 className="text-center mb-3">Login with Mobile</h4>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />

          {/* Remember Me (UI only) */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <div className="text-center mt-3">
            <small>
              Don't have an account? <a href="/signup" className="text-decoration-none">Register here</a>
            </small>
          </div>
        </div>
      </div>

      {/* ================= OTP MODAL ================= */}
      {showOtpModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Enter OTP</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowOtpModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <div className="text-center">
                    {canResend ? (
                      <button className="btn btn-link" onClick={sendOtp}>
                        Resend OTP
                      </button>
                    ) : (
                      <small className="text-muted">
                        Resend OTP in {timer}s
                      </small>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-success w-100"
                    onClick={verifyOtp}
                  >
                    Verify OTP
                  </button>
                </div>

              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* ================= OTP TOAST (DEV ONLY) ================= */}
      {showToast && (
        <div className="toast-container position-fixed top-0 end-0 p-3">
          <div className="toast show">
            <div className="toast-header">
              <strong className="me-auto text-primary">OTP Generated</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">
              <strong>Your OTP:</strong> {generatedOtp}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginOtp;
