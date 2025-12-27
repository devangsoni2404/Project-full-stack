import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './test-order.html',
  styleUrls: ['./test-order.css']
})
export class TestOrderComponent implements OnInit {

  tests: any[] = [];
  orders: any[] = [];
  
  // This object matches your TestOrder entity in Java
  order = {
    patientName: '',
    phone: '',
    test: null // This will hold the selected TestMaster object
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    // 1. Load available tests for the dropdown
    this.api.getTests().subscribe({
      next: (data) => this.tests = data,
      error: (err) => console.error('Error loading tests', err)
    });

    // 2. Load today's orders for the table
    this.loadOrders();
  }

  loadOrders() {
    this.api.getOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error loading orders', err)
    });
  }

  createOrder() {
    if (!this.order.test) {
      alert("Please select a test!");
      return;
    }

    // Send the order to Spring Boot
    this.api.createOrder(this.order).subscribe({
      next: (response) => {
        alert('Order Created Successfully! Order No: ' + response.orderNumber);
        this.loadOrders(); // Refresh the table list
        this.order = { patientName: '', phone: '', test: null }; // Reset form
      },
      error: (err) => {
        console.error('Error creating order', err);
        alert('Failed to create order. Check if backend is running.');
      }
    });
  }
}