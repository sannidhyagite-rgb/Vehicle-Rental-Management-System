package com.project.backend.vehicle.controller;

import com.project.backend.vehicle.dto.AddVehicleRequestDTO;
import com.project.backend.vehicle.dto.VendorVehicleResponseDTO;
import com.project.backend.vehicle.service.VendorVehicleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/vendor")
@CrossOrigin
@PreAuthorize("hasAuthority('VENDOR')")
public class VendorVehicleController {

    private final VendorVehicleService service;
    private final ObjectMapper objectMapper;

    public VendorVehicleController(
            VendorVehicleService service,
            ObjectMapper objectMapper
    ) {
        this.service = service;
        this.objectMapper = objectMapper;
    }

    // ================= ADD VEHICLE =================
    @PostMapping(
            value = "/vehicles",
            consumes = "multipart/form-data"
    )
    public String addVehicle(
            @RequestPart("data") String data,
            @RequestPart(value = "images", required = false)
            List<MultipartFile> images
    ) throws Exception {

        AddVehicleRequestDTO dto =
                objectMapper.readValue(data, AddVehicleRequestDTO.class);

        service.addVehicle(dto, images);
        return "Vehicle added successfully";
    }

    // ================= GET MY VEHICLES =================
    @GetMapping("/vehicles")
    public List<VendorVehicleResponseDTO> getVendorVehicles() {
        return service.getVendorVehicles();
    }
}
