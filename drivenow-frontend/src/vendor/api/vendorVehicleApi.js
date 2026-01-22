const BASE_URL = "http://localhost:8080";

export async function fetchMyVehicles(vendorId) {
  const res = await fetch(`${BASE_URL}/api/vendor/${vendorId}/vehicles`);
  if (!res.ok) throw new Error("Failed to fetch vehicles");
  return res.json();
}

export async function addVehicle(vendorId, form) {
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

  form.vehicleImages.forEach(img =>
    formData.append("images", img)
  );

  const res = await fetch(`${BASE_URL}/api/vendor/${vendorId}/vehicles`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) throw new Error("Failed to add vehicle");
}
