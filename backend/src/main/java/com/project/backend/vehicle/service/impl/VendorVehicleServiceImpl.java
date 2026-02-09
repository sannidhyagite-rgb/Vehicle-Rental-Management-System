package com.project.backend.vehicle.service.impl;

import com.project.backend.common.util.CurrentUserUtil;
import com.project.backend.vehicle.dto.AddVehicleRequestDTO;
import com.project.backend.vehicle.dto.VendorVehicleResponseDTO;
import com.project.backend.vehicle.entity.Vehicle;
import com.project.backend.vehicle.entity.VehicleImage;
import com.project.backend.vehicle.enums.VehicleStatus;
import com.project.backend.vehicle.repository.VehicleImageRepository;
import com.project.backend.vehicle.repository.VehicleRepository;
import com.project.backend.vehicle.service.VendorVehicleService;
import com.project.backend.user.model.User;
import com.project.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorVehicleServiceImpl implements VendorVehicleService {

    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final VehicleImageRepository vehicleImageRepository;

    public VendorVehicleServiceImpl(
            UserRepository userRepository,
            VehicleRepository vehicleRepository,
            VehicleImageRepository vehicleImageRepository
    ) {
        this.userRepository = userRepository;
        this.vehicleRepository = vehicleRepository;
        this.vehicleImageRepository = vehicleImageRepository;
    }

    // ================= ADD VEHICLE =================
    @Override
    public void addVehicle(AddVehicleRequestDTO dto, List<MultipartFile> images) {

        // Get logged-in vendor
        User vendor = userRepository.findByEmail(
                CurrentUserUtil.getLoggedInEmail()
        ).orElseThrow(() -> new RuntimeException("Logged-in vendor not found"));

        Vehicle vehicle = new Vehicle();
        vehicle.setCompany(dto.getCompany());
        vehicle.setModel(dto.getModel());
        vehicle.setYear(dto.getYear());
        vehicle.setTransmission(dto.getTransmission());
        vehicle.setFuel(dto.getFuel());
        vehicle.setSeats(dto.getSeats());
        vehicle.setRatePerDay(dto.getRatePerDay());
        vehicle.setDescription(dto.getDescription());
        vehicle.setFeatures(dto.getFeatures());

        vehicle.setRegistrationNumber(dto.getRegistrationNumber());
        vehicle.setRcNumber(dto.getRcNumber());
        vehicle.setInsuranceExpiry(dto.getInsuranceExpiry());
        vehicle.setPucExpiry(dto.getPucExpiry());
        vehicle.setChassisLast4(dto.getChassisLast4());
        vehicle.setEngineNumber(dto.getEngineNumber());

        // IMPORTANT: Admin approval workflow
        vehicle.setStatus(VehicleStatus.PENDING);
        vehicle.setVendor(vendor);

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        // Store images
        if (images != null && !images.isEmpty()) {
            for (MultipartFile img : images) {
                try {
                    if (img.isEmpty()) continue;

                    VehicleImage image = new VehicleImage();
                    image.setVehicle(savedVehicle);
                    image.setImageData(img.getBytes());
                    image.setImageType(img.getContentType());

                    vehicleImageRepository.save(image);

                } catch (Exception e) {
                    throw new RuntimeException("Image upload failed", e);
                }
            }
        }
    }

    // ================= GET VENDOR VEHICLES =================
    @Override
    public List<VendorVehicleResponseDTO> getVendorVehicles() {

        User vendor = userRepository.findByEmail(
                CurrentUserUtil.getLoggedInEmail()
        ).orElseThrow(() -> new RuntimeException("Logged-in vendor not found"));

        return vehicleRepository.findByVendor(vendor)
                .stream()
                .map(vehicle -> {

                    VendorVehicleResponseDTO dto = new VendorVehicleResponseDTO();
                    dto.setId(vehicle.getId());
                    dto.setTitle(vehicle.getCompany() + " " + vehicle.getModel());
                    dto.setSubtitle(vehicle.getYear() + " - " + vehicle.getFuel());
                    dto.setStatus(vehicle.getStatus().name());
                    dto.setRatePerDay(vehicle.getRatePerDay());

                    // First image only
                    dto.setImages(
                            vehicleImageRepository.findByVehicle(vehicle)
                                    .stream()
                                    .limit(1)
                                    .map(img ->
                                            "data:" + img.getImageType() + ";base64," +
                                                    Base64.getEncoder()
                                                            .encodeToString(img.getImageData())
                                    )
                                    .collect(Collectors.toList())
                    );

                    return dto;
                })
                .collect(Collectors.toList());
    }
}
