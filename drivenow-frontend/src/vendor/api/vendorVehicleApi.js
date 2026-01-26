import api from "./axios";

// ================= GET VENDOR VEHICLES =================
export const fetchMyVehicles = async () => {
  const response = await api.get("/vendor/vehicles");
  return response.data;
};

// ================= ADD VEHICLE =================
export const addVehicle = async (form) => {
  const formData = new FormData();

  const payload = {
    company: form.company,
    model: form.model,
    year: Number(form.year),
    transmission: form.transmission,
    fuel: form.fuel,
    carType: form.carType,
    seats: Number(form.seats),
    ratePerDay: Number(form.ratePerDay),
    description: form.description,
    registrationNumber: form.registrationNumber,
    rcNumber: form.rcNumber,
    insuranceExpiry: form.insuranceExpiry,
    pucExpiry: form.pucExpiry,
    chassisLast4: form.chassisLast4,
    engineNumber: form.engineNumber,
    features: form.features || [],
  };

  // JSON data
  formData.append(
    "data",
    new Blob([JSON.stringify(payload)], {
      type: "application/json",
    })
  );

  // Vehicle images
  if (Array.isArray(form.vehicleImages)) {
    form.vehicleImages.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });
  }

  const response = await api.post("/vendor/vehicles", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
