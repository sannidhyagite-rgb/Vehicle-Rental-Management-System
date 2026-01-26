package com.project.backend.vehicle.service.impl;

import com.project.backend.vehicle.dto.AdminVehicleResponseDTO;
import com.project.backend.vehicle.entity.Vehicle;
import com.project.backend.vehicle.enums.VehicleStatus;
import com.project.backend.vehicle.repository.VehicleRepository;
import com.project.backend.vehicle.service.AdminVehicleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminVehicleServiceImpl implements AdminVehicleService {

    private final VehicleRepository vehicleRepository;

    public AdminVehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    // ================= GET VEHICLES BY STATUS =================
    @Override
    public List<AdminVehicleResponseDTO> getVehiclesByStatus(String status) {

        VehicleStatus vehicleStatus = VehicleStatus.valueOf(status.toUpperCase());

        return vehicleRepository.findByStatus(vehicleStatus)
                .stream()
                .map(vehicle -> {

                    AdminVehicleResponseDTO dto = new AdminVehicleResponseDTO();
                    dto.setId(vehicle.getId());
                    dto.setCompany(vehicle.getCompany());
                    dto.setModel(vehicle.getModel());
                    dto.setYear(vehicle.getYear());
                    dto.setFuel(vehicle.getFuel().name());
                    dto.setTransmission(vehicle.getTransmission().name());
                    dto.setStatus(vehicle.getStatus().name());
                    dto.setVendorName(
                            vehicle.getVendor().getFullName()
                    );

                    return dto;
                })
                .collect(Collectors.toList());
    }

    // ================= APPROVE VEHICLE =================
    @Override
    public void approveVehicle(Long vehicleId) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicle.setStatus(VehicleStatus.APPROVED);
        vehicleRepository.save(vehicle);
    }

    // ================= REJECT VEHICLE =================
    @Override
    public void rejectVehicle(Long vehicleId) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicle.setStatus(VehicleStatus.REJECTED);
        vehicleRepository.save(vehicle);
    }
}
