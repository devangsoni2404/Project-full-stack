package com.pathology.backend.repository;

import com.pathology.backend.entity.TestMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestMasterRepository extends JpaRepository<TestMaster, Long> {
    
    // Supports the requirement: "Simple search by test name" 
    List<TestMaster> findByNameContainingIgnoreCase(String name);
}