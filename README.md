README  
Vehicle Management System Web Application  

The Vehicle Management System is a web-based application that allows users to book vehicles, vendors to manage their vehicles, and admins to control the system.  

It is designed to simplify the process of vehicle booking and management with secure authentication and role-based access.

Users can register, browse available vehicles, make bookings, and complete payments, while vendors and admins can manage vehicles and users efficiently.

---

### Features

User Registration and Login  
Role-based Access (Admin, Vendor, Customer)  
Vehicle Booking System  
Secure Authentication using JWT  
Online Payment Integration (Razorpay)  
Vehicle Management (Add, Update, Delete)  
Backend validation and error handling  

---

### Technologies Used

Frontend  
React.js  
HTML  
CSS  
JavaScript  

Backend  
Java  
Spring Boot  
Spring Security  
REST APIs  

Database  
MySQL  

DevOps  
Docker  
AWS EC2  

---

### Project Structure

Vehicle_Management_System  
│  
├── backend  
│   ├── controllers  
│   ├── services  
│   ├── repositories  
│   ├── models  
│   ├── config  
│   └── application.properties  
│  
├── frontend  
│   ├── src  
│   │   ├── components  
│   │   ├── pages  
│   │   └── services  
│   ├── public  
│   └── package.json  
│  
└── README.md  

---

### How to Run the Project

#### 1. Clone the repository
git clone https://github.com/your-username/vehicle-management-system.git  

---

### 2. Backend setup

cd backend  
mvn clean install  
mvn spring-boot:run  

---

### 3. Database

Create a MySQL database  
Update database credentials in application.properties  
Run required SQL tables  

---

### 4. Frontend

cd frontend  
npm install  
npm start  

Make sure backend is running on default port (8080)

---

### Usage

Register a new user  
Login with credentials  
Browse available vehicles  
Book a vehicle  
Make payment using Razorpay  
Manage vehicles (Admin/Vendor)  

---

### Future Improvements

Add booking history tracking  
Improve UI/UX    
Implement analytics dashboard  
Enhance performance optimization  

---

### Author

Developed by Sanidhya Geete  
(CDAC Project)
