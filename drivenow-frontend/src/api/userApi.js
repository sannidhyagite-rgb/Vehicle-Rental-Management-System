import api from "./axios";

/**
 * Get logged-in user's profile
 */
export const getMyProfile = () => {
  return api.get("/users/me");
};

/**
 * Update logged-in user's profile
 * @param {Object} data
 */
export const updateMyProfile = (data) => {
  return api.put("/users/me", data);
};
