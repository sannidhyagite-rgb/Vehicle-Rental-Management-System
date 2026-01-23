import api from "./axios";

// Get all pending licenses (ADMIN)
export const getPendingLicenses = () =>
  api.get("/api/admin/licenses/pending");

// Approve / Reject license (ADMIN)
export const verifyLicense = (licenseId, approve) =>
  api.put(`/api/admin/licenses/${licenseId}/verify`, {
    approve,
  });
