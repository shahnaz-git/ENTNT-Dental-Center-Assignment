#  Dental Center Management System - ENTNT Technical Assignment

A **responsive, role-based Dental Center Management Dashboard** built using **React.js + Vite**.  
This is a **frontend-only** solution using **localStorage** to simulate all data, including patients, appointments, and incidents.

##  Live Demo

- **Deployed App**: [Click to View Live App](https://entnt-dental-center-assignment.vercel.app)  
- **GitHub Repository**: [https://github.com/shahnaz-git/ENTNT-Dental-Center-Assignment](https://github.com/shahnaz-git/ENTNT-Dental-Center-Assignment)

---

## Project Description

This system simulates real-world dental center workflows. It includes:

-  Role-based login: **Admin (Dentist)** and **Patient**
-  Admin Dashboard: Manage patients, appointments (incidents), and medical records
-  Calendar View: Visualize upcoming appointments
-  Patient Dashboard: View **own** appointments, history, and attached treatment files
-  Data Persistence: All data handled via `localStorage`, including **file uploads as Base64**
-  Responsive Design: Optimized for **mobile**, **tablet**, and **desktop**


##  User Credentials

###  Admin Login (Full Access)
- **Email**: `admin@entnt.in`
- **Password**: `admin123`  
   Full access to all patient data, appointments, calendar, records, and uploads.

###  Patient Login (View-Only Access)
- **Email**: `john@entnt.in`
- **Password**: `patient123`  
   This patient can **only view their own data**, including profile, appointments, and treatment history.  
   Cannot modify or view other patients' records.


##  Setup & Installation (Vite + React)

###  Prerequisites
- [Node.js](https://nodejs.org/) (v18 recommended)
- npm (v9 or higher)

###  Installation Steps

# 1. Clone the repository
```
git clone https://github.com/shahnaz-git/ENTNT-Dental-Center-Assignment.git
```
```
cd ENTNT-Dental-Center-Assignment
```
# 2. Install dependencies
```
npm install
```

# 3. Start the development server
```
npm run dev
```

# 4. Open in browser:
arduino
```
http://localhost:5173
```

Project Architecture
```
src/
├── contexts/
│   ├── AuthContext.js          # Authentication state management
│   ├── DataContext.js          # Application data (patients, appointments)
│   ├── PatientProfileContext.js # Patient-specific profile management
│   └── index.js                # Context exports
├── Admin/
│   ├── AdminDashboard.jsx      # Main admin interface
│   ├── AdminDashboard.css      # Unified styling
│   ├── Calender.jsx           # Appointment calendar
│   ├── Patients/
│   │   ├── PatientForm.jsx    # Patient CRUD operations
│   │   ├── PatientList.jsx    # Patient management table
│   │   └── PatientIncidents.jsx # Incident tracking
│   └── Records/
│       ├── RecordsManagement.jsx # Medical records
│       └── RecordsManagement.css # Records styling
├── Patient/
│   └── PatientDashboard.jsx    # Patient interface
├── routes/
│   └── AppRoutes.jsx           # Application routing
├── LoginPage.jsx               # Authentication component
└── App.js                      # Main application component

```


State Management & Data Flow

- AuthContext → Handles login, logout, and role
- DataContext → Stores patients, incidents, and appointments
- PatientProfileContext → Keeps patient view scoped to their data
- localStorage → Used for all persistence (users, incidents, uploads)
- Base64 Uploads → Files (invoices, x-rays, etc.) stored in memory-safe format

Admin Dashboard Features

- Add/Edit/Delete patients
- Manage incidents: title, notes, cost, treatment, status
- File uploads for each treatment (PDFs, images)
- Appointment calendar with clickable slots
- Dashboard KPIs: total revenue, pending/completed treatments, top patients

Patient Dashboard Features

- View personal profile
- See upcoming appointments
- Review treatment history
- Download/view attached files

Technical Decisions

| Area             | Choice/Tool           | Reason                                      |
| ---------------- | --------------------- | ------------------------------------------- |
| Framework        | React + Vite          | Fast, modern SPA development                |
| State Management | Context API           | Simple, lightweight for app-wide state      |
| Styling          | Custom CSS + Flexbox  | Full control, mobile responsive             |
| Data Handling    | localStorage          | Requirement constraint (no backend)         |
| File Uploads     | Base64 encoding       | Works without server, persistent in storage |
| Routing          | React Router DOM      | For role-based routing and access           |
| Forms            | Controlled Components | Validation and user input control           |


Submission Details
| Field               | Value                             |
| ------------------- | --------------------------------- |
| Role                | Frontend Developer (React)        |
| Assignment          | Dental Center Management          |
| Submission Deadline | 8th July 2025                     |
| Submission Email    | [hr@entnt.in](mailto:hr@entnt.in) |


👩‍💻 Developed by
Shahnaz Bano

Software Developer

GitHub: @shahnaz-git

© 2025 Dental Center Management System 
