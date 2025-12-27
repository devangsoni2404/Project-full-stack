package com.pathology.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class TestOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String patientName;   // [cite: 10]
    private String phone;         // [cite: 10]
    private String orderNumber;   // [cite: 11]
    private LocalDate orderDate;  // [cite: 10]

    @ManyToOne
    private TestMaster test;      // [cite: 10]

    // Result Fields [cite: 14]
    private String resultValue;
    private String technicianNotes;
    private String status = "Pending"; // [cite: 15]
}