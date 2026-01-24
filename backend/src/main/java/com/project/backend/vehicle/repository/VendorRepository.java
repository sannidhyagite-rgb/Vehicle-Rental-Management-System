package com.project.backend.vehicle.repository;

import com.project.backend.vehicle.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
}
