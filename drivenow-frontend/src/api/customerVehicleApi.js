import api from "./axios";

export const fetchApprovedVehicles = async () => {
  const res = await api.get("/customer/vehicles");
  return res.data;
};

export const getCustomerVehicleById = (id) => {
  return api.get(`/customer/vehicles/${id}`);
};