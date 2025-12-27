package com.pathology.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TestMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;        // [cite: 7]
    private String code;        // [cite: 7]
    private String sampleType;  // [cite: 7]
    private String normalRange; // [cite: 7]
    private Double price;       // [cite: 7]
}