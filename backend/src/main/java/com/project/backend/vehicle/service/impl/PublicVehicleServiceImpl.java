package com.project.backend.vehicle.service.impl;

import com.project.backend.vehicle.dto.AdminVehicleResponseDTO;
import com.project.backend.vehicle.entity.Vehicle;
import com.project.backend.vehicle.enums.VehicleStatus;
import com.project.backend.vehicle.repository.VehicleRepository;
import com.project.backend.vehicle.service.PublicVehicleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PublicVehicleServiceImpl implements PublicVehicleService {

    private final VehicleRepository vehicleRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<AdminVehicleResponseDTO> getAllApprovedVehicles() {
        return vehicleRepository.findByStatus(VehicleStatus.APPROVED).stream()
                .map(vehicle -> {
                    AdminVehicleResponseDTO dto = modelMapper.map(vehicle, AdminVehicleResponseDTO.class);
                    if (vehicle.getLocation() != null) {
                        dto.setCity(vehicle.getLocation().getCity());
                        dto.setAddress(vehicle.getLocation().getAddress());
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public AdminVehicleResponseDTO getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        AdminVehicleResponseDTO dto = modelMapper.map(vehicle, AdminVehicleResponseDTO.class);
        if (vehicle.getLocation() != null) {
            dto.setCity(vehicle.getLocation().getCity());
            dto.setAddress(vehicle.getLocation().getAddress());
        }
        return dto;
    }
}
