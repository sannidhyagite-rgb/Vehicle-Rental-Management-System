const BASE_URL = "http://localhost:8080";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`
  };
}

// ================= GET MY VEHICLES =================
export async function fetchMyVehicles() {
  const res = await fetch(`${BASE_URL}/api/vendor/vehicles`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) throw new Error("Failed to fetch vehicles");
  return res.json();
}

// ================= ADD VEHICLE =================
export async function addVehicle(form) {
  const formData = new FormData();

  const data = {
    company: form.company,
    model: form.model,
    year: Number(form.year),
    transmission: form.transmission,
    fuel: form.fuel,
    seats: Number(form.seats),
    ratePerDay: Number(form.ratePerDay),
    description: form.description,
    registrationNumber: form.registrationNumber,
    rcNumber: form.rcNumber,
    insuranceExpiry: form.insuranceExpiry,
    pucExpiry: form.pucExpiry,
    chassisLast4: form.chassisLast4,
    engineNumber: form.engineNumber,
    features: form.features
  };

  formData.append(
    "data",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );

  form.vehicleImages.forEach(img => {
    formData.append("images", img);
  });

  const res = await fetch(`${BASE_URL}/api/vendor/vehicles`, {
    method: "POST",
    headers: getAuthHeaders(), // 🔥 REQUIRED
    body: formData
  });

  if (!res.ok) throw new Error("Failed to add vehicle");
}
