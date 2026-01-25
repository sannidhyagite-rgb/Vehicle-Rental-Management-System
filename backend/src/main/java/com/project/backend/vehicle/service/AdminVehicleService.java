package com.project.backend.vehicle.service;

import com.project.backend.vehicle.dto.AdminVehicleResponseDTO;

import java.util.List;

public interface AdminVehicleService {

    List<AdminVehicleResponseDTO> getVehiclesByStatus(String status);

    void approveVehicle(Long vehicleId);

    void rejectVehicle(Long vehicleId);
}
