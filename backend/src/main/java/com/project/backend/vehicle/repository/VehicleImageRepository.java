package com.project.backend.vehicle.repository;

import com.project.backend.vehicle.entity.Vehicle;
import com.project.backend.vehicle.entity.VehicleImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleImageRepository extends JpaRepository<VehicleImage, Long> {
    List<VehicleImage> findByVehicle(Vehicle vehicle);

}
