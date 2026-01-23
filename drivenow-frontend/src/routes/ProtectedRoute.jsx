import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  console.log("ProtectedRoute:", {
    token,
    userRole,
    requiredRole: role,
    currentPath: window.location.pathname,
  });

  if (!token) {
    console.log("❌ No token → redirect to login");
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    console.log("❌ Role mismatch → redirect to home");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Access allowed");
  return children;
}

export default ProtectedRoute;
