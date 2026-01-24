package com.project.backend.vehicle.repository;

import com.project.backend.user.model.User;
import com.project.backend.vehicle.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByVendor(User vendor);
}
