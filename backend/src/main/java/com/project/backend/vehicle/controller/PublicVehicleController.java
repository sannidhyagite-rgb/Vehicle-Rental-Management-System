package com.project.backend.vehicle.controller;

import com.project.backend.vehicle.dto.CustomerVehicleResponseDTO;
import com.project.backend.vehicle.service.CustomerVehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/vehicles")
@RequiredArgsConstructor
public class PublicVehicleController {

    private final CustomerVehicleService customerVehicleService;

    @GetMapping
    public List<CustomerVehicleResponseDTO> getPublicVehicles() {
        return customerVehicleService.getApprovedVehicles();
    }

    @GetMapping("/{id}")
    public CustomerVehicleResponseDTO getPublicVehicleById(
            @PathVariable Long id
    ) {
        return customerVehicleService.getVehicleById(id);
    }
}
