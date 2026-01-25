import api from "./axios";

// ADMIN – get pending licenses
export const getPendingLicenses = () => {
  return api.get("/admin/licenses/pending");
};

// ADMIN – approve / reject license
export const verifyLicense = (licenseId, approve) => {
  return api.put(`/admin/licenses/${licenseId}/verify`, {
    approve
  });
};
