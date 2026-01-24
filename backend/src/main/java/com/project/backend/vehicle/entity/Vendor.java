package com.project.backend.vehicle.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "vendors")
@Data
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
}
