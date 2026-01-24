import api from "./axios";

// Get vehicles by status
export const getAdminVehicles = async (status) => {
  const res = await api.get(`/admin/vehicles?status=${status}`);
  return res.data;
};

// Approve vehicle
export const approveVehicle = async (id) => {
  return api.put(`/admin/vehicles/${id}/approve`);
};

// Reject vehicle
export const rejectVehicle = async (id) => {
  return api.put(`/admin/vehicles/${id}/reject`);
};
