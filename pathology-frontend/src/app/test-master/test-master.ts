import { Component, OnInit } from '@angular/core'; // Added OnInit
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-test-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './test-master.html',
  styleUrls: ['./test-master.css']
})
export class TestMasterComponent implements OnInit { // Implement OnInit

  tests: any[] = [];
  test = {
    name: '',
    code: '',
    sampleType: '',
    normalRange: '',
    price: ''
  };

  constructor(private api: ApiService) { }

  // Runs automatically when the page loads
  ngOnInit() {
    this.refreshTests();
  }

  // Helper method to fetch the latest tests from MySQL
  refreshTests() {
    this.api.getTests().subscribe({
      next: (data) => {
        this.tests = data;
      },
      error: (err) => {
        console.error('Error fetching tests:', err);
        alert('Could not connect to the Backend server.');
      }
    });
  }

  addTest() {
    // Send the test object to the Spring Boot POST endpoint
    this.api.addTest(this.test).subscribe({
      next: (response) => {
        console.log('Test added successfully:', response);
        // Refresh the list from the database after adding
        this.refreshTests(); 
        // Reset the form
        this.test = { name: '', code: '', sampleType: '', normalRange: '', price: '' };
        alert('Test added to Master successfully!');
      },
      error: (err) => {
        console.error('Error adding test:', err);
      }
    });
  }
}