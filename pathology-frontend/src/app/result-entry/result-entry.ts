import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-entry',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './result-entry.html',
  styleUrls: ['./result-entry.css']
})
export class ResultEntryComponent implements OnInit {

  orders: any[] = [];
  selectedOrder: any = null; // Holds the order currently being edited
  result = {
    resultValue: '', // Matches the field name in your Spring Boot Entity
    technicianNotes: '' // Matches the field name in your Spring Boot Entity
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadOrders();
  }

  // Fetches orders from the backend to display in your list/table
  loadOrders() {
    this.api.getOrders().subscribe({
      next: (data) => {
        // You might want to filter only "Pending" orders here
        this.orders = data;
      },
      error: (err) => console.error('Error loading orders:', err)
    });
  }

  // Called when a user clicks 'Enter Result' for a specific order
  selectOrder(order: any) {
    this.selectedOrder = order;
  }

  submitResult() {
    if (!this.selectedOrder) return;

    // Calls the PUT endpoint: /api/orders/{id}/results
    this.api.completeResult(this.selectedOrder.id, this.result).subscribe({
      next: (response) => {
        alert('Result submitted successfully! Status updated to Completed.');
        this.selectedOrder = null; // Close the edit form
        this.result = { resultValue: '', technicianNotes: '' }; // Reset form
        this.loadOrders(); // Refresh the list to show updated status
      },
      error: (err) => {
        console.error('Error submitting result:', err);
        alert('Failed to save result.');
      }
    });
  }
}