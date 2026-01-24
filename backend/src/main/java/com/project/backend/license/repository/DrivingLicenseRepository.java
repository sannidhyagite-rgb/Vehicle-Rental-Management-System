package com.project.backend.license.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.license.entity.DrivingLicense;
import com.project.backend.license.entity.LicenseStatus;
import com.project.backend.user.model.User;

public interface DrivingLicenseRepository extends JpaRepository<DrivingLicense, Long> {

    Optional<DrivingLicense> findByUser(User user);

    boolean existsByUser(User user);

    boolean existsByLicenseNumber(String licenseNumber);
    
    List<DrivingLicense> findByStatus(LicenseStatus status);

}
