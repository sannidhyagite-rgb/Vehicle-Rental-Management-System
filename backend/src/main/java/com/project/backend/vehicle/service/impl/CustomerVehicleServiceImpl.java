package com.project.backend.vehicle.service.impl;

import com.project.backend.vehicle.dto.CustomerVehicleResponseDTO;
import com.project.backend.vehicle.entity.Vehicle;
import com.project.backend.vehicle.enums.VehicleStatus;
import com.project.backend.vehicle.repository.VehicleImageRepository;
import com.project.backend.vehicle.repository.VehicleRepository;
import com.project.backend.vehicle.service.CustomerVehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerVehicleServiceImpl implements CustomerVehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleImageRepository vehicleImageRepository;

    @Override
    public List<CustomerVehicleResponseDTO> getApprovedVehicles() {

        return vehicleRepository.findByStatus(VehicleStatus.APPROVED)
                .stream()
                .map(vehicle -> mapToDto(vehicle))
                .toList();
    }

    private CustomerVehicleResponseDTO mapToDto(Vehicle vehicle) {

        CustomerVehicleResponseDTO dto = new CustomerVehicleResponseDTO();
        dto.setId(vehicle.getId());
        dto.setCompany(vehicle.getCompany());
        dto.setModel(vehicle.getModel());
        dto.setYear(vehicle.getYear());
        dto.setFuel(vehicle.getFuel().name());
        dto.setRatePerDay(vehicle.getRatePerDay());

        // First image only
        dto.setImage(
                vehicleImageRepository.findByVehicle(vehicle)
                        .stream()
                        .findFirst()
                        .map(img ->
                                "data:" + img.getImageType() + ";base64," +
                                        Base64.getEncoder()
                                                .encodeToString(img.getImageData())
                        )
                        .orElse(null)
        );

        return dto;
    }

    @Override
    public CustomerVehicleResponseDTO getVehicleById(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (vehicle.getStatus() != VehicleStatus.APPROVED) {
            throw new RuntimeException("Vehicle not approved");
        }

        return mapToDto(vehicle);
    }

}
