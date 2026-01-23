import api from "./axios";

// Submit driving license
export const submitLicense = (data) =>
  api.post("/api/license", data);

// Get my license status
export const getLicenseStatus = () =>
  api.get("/api/license/status");