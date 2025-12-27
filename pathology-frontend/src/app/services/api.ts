import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // The base URL of your Spring Boot Controller
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // 1. Get all tests from Backend
  getTests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tests`);
  }

  // 2. Save a new test to MySQL via Backend
  addTest(test: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tests`, test);
  }

  // 3. Create a new order (Backend handles the unique order number logic)
  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, order);
  }

  // 4. Get today's orders from Backend
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders/today`);
  }

  // 5. Update result and mark as COMPLETED
  completeResult(orderId: number, resultData: any): Observable<any> {
    // resultData should contain resultValue and technicianNotes
    return this.http.put(`${this.baseUrl}/orders/${orderId}/results`, resultData);
  }
}