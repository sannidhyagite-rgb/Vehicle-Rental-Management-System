import api from "./axios";

export const getMyProfile = () => api.get("/api/users/me");

export const updateMyProfile = (data) =>
  api.put("/api/users/me", data);
