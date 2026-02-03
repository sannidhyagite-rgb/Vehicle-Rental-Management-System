package com.project.backend.vehicle.service;

import com.project.backend.vehicle.dto.AdminVehicleResponseDTO;
import java.util.List;

public interface PublicVehicleService {
    List<AdminVehicleResponseDTO> getAllApprovedVehicles();
    AdminVehicleResponseDTO getVehicleById(Long id);
}
