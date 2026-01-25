package com.project.backend.vehicle.service;

import com.project.backend.vehicle.dto.AddVehicleRequestDTO;
import com.project.backend.vehicle.dto.VendorVehicleResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VendorVehicleService {

    void addVehicle(AddVehicleRequestDTO dto, List<MultipartFile> images);

    List<VendorVehicleResponseDTO> getVendorVehicles();
}

