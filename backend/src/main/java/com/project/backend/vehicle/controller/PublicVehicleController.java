package com.project.backend.vehicle.controller;

import com.project.backend.vehicle.dto.AdminVehicleResponseDTO;
import com.project.backend.vehicle.service.PublicVehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class PublicVehicleController {

    private final PublicVehicleService publicVehicleService;

    // Get All Approved Vehicles
    @GetMapping
    public ResponseEntity<List<AdminVehicleResponseDTO>> getAllVehicles() {
        return ResponseEntity.ok(publicVehicleService.getAllApprovedVehicles());
    }

    // Get Vehicle By ID
    @GetMapping("/{id}")
    public ResponseEntity<AdminVehicleResponseDTO> getVehicleById(@PathVariable Long id) {
        return ResponseEntity.ok(publicVehicleService.getVehicleById(id));
    }
}
