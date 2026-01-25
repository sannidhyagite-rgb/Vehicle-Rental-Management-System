package com.project.backend.vehicle.controller;

import com.project.backend.vehicle.dto.CustomerVehicleResponseDTO;
import com.project.backend.vehicle.entity.Vehicle;
import com.project.backend.vehicle.service.CustomerVehicleService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer/vehicles")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('CUSTOMER')")
public class CustomerVehicleController {

    private final CustomerVehicleService customerVehicleService;

    // ✅ LIST (Dashboard)
    @GetMapping
    public List<CustomerVehicleResponseDTO> getApprovedVehicles() {
        return customerVehicleService.getApprovedVehicles();
    }

    // ✅ DETAILS (View Details)
    @GetMapping("/{id}")
    public ResponseEntity<CustomerVehicleResponseDTO> getVehicleById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(customerVehicleService.getVehicleById(id));
    }
}
