Pathology Lab System
A Full-Stack application to manage lab tests, patient orders, and results.

🛠️ Tech Stack
Frontend: Angular (v18), HttpClient, Forms.

Backend: Spring Boot, Spring Data JPA.

Database: MySQL.

🚀 Setup & Run
1. Database
Create a schema named pathology_db in MySQL.

2. Backend (Spring Boot)
Config: Set your MySQL username/password in application.properties.

CORS: Ensure @CrossOrigin(origins = "http://localhost:4200") is on your Controller.

Run: Execute mvn spring-boot:run. API starts at localhost:8080.

3. Frontend (Angular)
Install: npm install.

Run: ng serve. UI starts at localhost:4200.

📂 Project Structure
Test Master: Add/View test catalog (Name, Code, Price).

Test Order: Create patient requests with auto-generated Order IDs.

Result Entry: Input values and mark orders as "COMPLETED".
