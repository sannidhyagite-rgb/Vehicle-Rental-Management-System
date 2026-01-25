package com.project.backend.vehicle.controller;

import com.project.backend.vehicle.dto.AdminVehicleResponseDTO;
import com.project.backend.vehicle.service.AdminVehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/vehicles")
@PreAuthorize("hasAuthority('ADMIN')") // 🔥 FIXED
public class AdminVehicleController {

    private final AdminVehicleService adminVehicleService;

    public AdminVehicleController(AdminVehicleService adminVehicleService) {
        this.adminVehicleService = adminVehicleService;
    }

    // ================= GET VEHICLES =================
    @GetMapping
    public ResponseEntity<List<AdminVehicleResponseDTO>> getVehiclesByStatus(
            @RequestParam String status
    ) {
        return ResponseEntity.ok(
                adminVehicleService.getVehiclesByStatus(status)
        );
    }

    // ================= APPROVE =================
    @PutMapping("/{id}/approve")
    public ResponseEntity<String> approveVehicle(@PathVariable Long id) {
        adminVehicleService.approveVehicle(id);
        return ResponseEntity.ok("Vehicle approved successfully");
    }

    // ================= REJECT =================
    @PutMapping("/{id}/reject")
    public ResponseEntity<String> rejectVehicle(@PathVariable Long id) {
        adminVehicleService.rejectVehicle(id);
        return ResponseEntity.ok("Vehicle rejected successfully");
    }
}
