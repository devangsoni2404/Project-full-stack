package com.pathology.backend.controller;

import com.pathology.backend.entity.TestMaster;
import com.pathology.backend.entity.TestOrder;
import com.pathology.backend.repository.TestMasterRepository;
import com.pathology.backend.repository.TestOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Connects to Angular UI [cite: 22]
public class PathologyController {

    @Autowired
    private TestMasterRepository testRepo;

    @Autowired
    private TestOrderRepository orderRepo;

    // --- 1. TEST MASTER (Basic) ---
    
    // Add a new pathology test [cite: 7]
    @PostMapping("/tests")
    public TestMaster addTest(@RequestBody TestMaster test) {
        return testRepo.save(test);
    }

    // List existing tests and search by test name [cite: 7, 8]
    @GetMapping("/tests")
    public List<TestMaster> getAllTests(@RequestParam(required = false) String name) {
        if (name != null && !name.isEmpty()) {
            return testRepo.findByNameContainingIgnoreCase(name);
        }
        return testRepo.findAll();
    }

    // --- 2. TEST ORDER / LAB REQUEST ---

    // Create a test order and assign a unique order number [cite: 10, 11]
    @PostMapping("/orders")
    public TestOrder createOrder(@RequestBody TestOrder order) {
        order.setOrderDate(LocalDate.now()); // Sets date automatically [cite: 10]
        order.setOrderNumber("ORD-" + System.currentTimeMillis()); // Unique order number 
        order.setStatus("Pending"); // Default status for new orders
        return orderRepo.save(order);
    }

    // List all orders for today [cite: 12]
    @GetMapping("/orders/today")
    public List<TestOrder> getTodaysOrders() {
        return orderRepo.findByOrderDate(LocalDate.now());
    }

    // --- 3. RESULT ENTRY (Simple) ---

    // Enter test result value and technician notes, mark as Completed 
    @PutMapping("/orders/{id}/results")
    public TestOrder enterResult(@PathVariable Long id, @RequestBody TestOrder resultData) {
        TestOrder order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setResultValue(resultData.getResultValue()); // [cite: 14]
        order.setTechnicianNotes(resultData.getTechnicianNotes()); // [cite: 14]
        order.setStatus("Completed"); // [cite: 15]
        
        return orderRepo.save(order);
    }

    // View completed results for an order [cite: 16]
    @GetMapping("/orders/{id}")
    public TestOrder getOrderDetails(@PathVariable Long id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
}