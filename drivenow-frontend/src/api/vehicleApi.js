import api from "./axios";

// Get all vehicles
export const getAllVehicles = () => api.get("/vehicles");

// Get Featured Vehicles (top 3)
export const getFeaturedVehicles = () => api.get("/vehicles/featured");

// Get Vehicle by ID
export const getVehicleById = (id) => api.get(`/vehicles/${id}`);
