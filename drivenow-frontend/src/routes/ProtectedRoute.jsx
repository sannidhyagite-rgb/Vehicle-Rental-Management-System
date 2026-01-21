function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("ProtectedRoute:", {
    token,
    user,
    requiredRole: role,
    currentPath: window.location.pathname
  });

  if (!token || !user) {
    console.log("❌ No token or user → redirect to login");
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    console.log("❌ Role mismatch → redirect to home");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Access allowed");
  return children;
}
export default ProtectedRoute;