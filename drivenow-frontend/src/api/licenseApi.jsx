import api from "./axios";

/**
 * Submit driving license details
 * @param {FormData | Object} data
 */
export const submitLicense = (data) => {
  return api.post("/license", data);
};

/**
 * Get logged-in user's license status
 */
export const getLicenseStatus = () => {
  return api.get("/license/status");
};
