package com.project.backend.vehicle.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehicle_images")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    // Store image in DB
    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    // image/jpeg, image/png
    private String imageType;
}

