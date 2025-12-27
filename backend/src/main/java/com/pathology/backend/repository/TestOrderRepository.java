package com.pathology.backend.repository;

import com.pathology.backend.entity.TestOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface TestOrderRepository extends JpaRepository<TestOrder, Long> {

    // Supports the requirement: "List all orders for today" 
    List<TestOrder> findByOrderDate(LocalDate date);
}