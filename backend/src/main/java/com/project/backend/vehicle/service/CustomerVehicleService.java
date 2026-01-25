package com.project.backend.vehicle.service;

import com.project.backend.vehicle.dto.CustomerVehicleResponseDTO;
import java.util.List;

public interface CustomerVehicleService {

    List<CustomerVehicleResponseDTO> getApprovedVehicles();
    
    CustomerVehicleResponseDTO getVehicleById(Long id);

}
