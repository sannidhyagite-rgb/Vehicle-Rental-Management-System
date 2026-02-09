import api from "./axios";

export const getSummary = () => api.get("/bookings/summary");
export const getUpcoming = () => api.get("/bookings/upcoming");
export const getHistory = () => api.get("/bookings/completed");
export const createBooking = (bookingData) => api.post("/bookings", bookingData);

export const cancelBooking = (id) =>
  api.put(`/bookings/${id}/cancel`);

export const getBookingById = (id) => api.get(`/bookings/${id}`);

export const updateBooking = (id, bookingData) => api.put(`/bookings/${id}`, bookingData);
