# 🏥 Hospital Management System (HMS)

**An AI-Powered Healthcare Assistance Platform**

The Hospital Management System is a modern, web-based platform that digitizes hospital operations — patient records, appointments, prescriptions, and billing — while improving patient experience through integrated AI features.

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Objectives](#-key-objectives)
- [System Overview](#-system-overview)
- [User Roles](#-user-roles)
- [Functional Modules](#-functional-modules)
- [AI Features](#-ai-features)
- [Additional Features](#-additional-features)
- [Tech Stack](#-tech-stack)
- [Database Structure](#-database-structure)
- [Non-Functional Requirements](#-non-functional-requirements)
- [Development Roadmap](#-development-roadmap)
- [Team Responsibilities](#-team-responsibilities)
- [Getting Started](#-getting-started)
- [Expected Outcomes](#-expected-outcomes)
- [License](#-license)

---

## 📌 About the Project

Many hospitals still rely on manual processes for appointments, patient records, billing, and administrative tasks — leading to longer waiting times, inefficient workflows, and poor patient experience.

This Hospital Management System modernizes healthcare operations by combining:

- Secure patient record management
- Online appointment booking
- Digital prescriptions
- A complete medical billing system
- AI-assisted healthcare services
- Administrative analytics

> **Note on scope (v3.0):** To keep the project achievable within a two-week development timeline, two advanced AI features (*Smart Appointment Optimizer* and *AI Health Risk Predictor*) were removed from scope. In their place, a complete **Medical Billing System** was introduced as a core business module.

---

## 🎯 Key Objectives

- Digitize hospital operations
- Reduce administrative workload
- Improve patient experience
- Secure medical records
- Automate billing and payments
- Assist doctors using AI
- Provide intelligent patient support
- Build a scalable healthcare platform

---

## 🖥️ System Overview

The system is built around four major dashboards:

### Admin Dashboard
- Manage doctors, patients, departments, and appointments
- Manage billing, view revenue reports, and analytics
- System settings

### Doctor Dashboard
- View appointments and patient history
- Upload medical reports and write prescriptions
- AI report summarization and billing recommendations

### Patient Dashboard
- Register/login and book appointments
- View prescriptions and download reports
- Pay bills, view invoices, and chat with the AI assistant

### Billing Dashboard
- Generate invoices (consultation, medicine, laboratory, hospital charges)
- Insurance claim records and payment tracking
- Financial reports

---

## 👥 User Roles

| Role | Responsibilities |
|------|-------------------|
| **Administrator** | Hospital management, user management, department management, billing management, reports, and analytics |
| **Doctor** | Patient diagnosis, reports, prescriptions, AI report summary, and appointment management |
| **Patient** | Registration, appointment booking, medical history, bill payment, and AI assistance |

---

## 🧩 Functional Modules

1. **Authentication** — Login, Registration, Password Recovery, JWT Authentication, Role-Based Access Control
2. **Patient Management** — Add / Edit / Delete / Search Patient, Medical History
3. **Doctor Management** — Add Doctor, Assign Department, Manage Schedule, Doctor Profiles
4. **Appointment Management** — Book / Cancel Appointment, Appointment History & Status
5. **Medical Reports** — Upload / Download Reports, Digital Prescriptions, Report History
6. **Medical Billing System** — the complete financial workflow of the hospital:
   - **Features:** Patient Invoice Generation, Consultation Charges, Laboratory Test Billing, Medicine Billing, Hospital Service Charges, Automatic Bill Calculation
   - **Tracking & Reporting:** Payment Tracking, Payment Status (Paid/Pending), Invoice Download (PDF), Receipt Generation, Billing History, Insurance Claim Records, Revenue Reports, Admin Financial Dashboard

---

## 🤖 AI Features

### 1. Medical Report Summarizer
Doctors upload medical reports, and the AI summarizes complex medical information into patient-friendly language.

```
Example Summary:
Hemoglobin: Normal | Vitamin D: Low
Recommendation: Vitamin D supplements.
```
**Tech:** OpenAI API, FastAPI

### 2. Smart Doctor Recommendation
Patients enter symptoms, and the AI recommends the appropriate medical specialist.

```
Example: Eye Pain → Ophthalmologist | Chest Pain → Cardiologist
```
**Tech:** Machine Learning, NLP, FastAPI

### 3. AI Hospital Chatbot
A 24/7 assistant for patients, supporting hospital timings, doctor availability, appointment guidance, department information, and FAQs.

**Tech:** LLM, OpenAI API, FastAPI

---

## ✨ Additional Features

- Email Notifications
- Appointment Reminders
- Activity Logs
- Search & Filters
- Dashboard Analytics
- QR Code for Patients
- PDF Reports
- Responsive UI
- Dark Mode
- Data Export

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js, HTML5, CSS3, JavaScript, Bootstrap |
| **Backend** | Node.js, Express.js (Authentication, CRUD, Business Logic, REST APIs) |
| **AI Backend** | FastAPI (Python), OpenAI API, Scikit-Learn |
| **Database** | MySQL |
| **Version Control / Deployment** | Git & GitHub, Vercel (Frontend), Render / Railway (Backend), MySQL Cloud Database |

The backend architecture combines **Node.js + Express.js** for core business logic with **FastAPI (Python)** for AI and LLM services, enabling scalable AI integration.

---

## 🗄️ Database Structure

Core tables:

`Users` · `Patients` · `Doctors` · `Departments` · `Appointments` · `MedicalReports` · `Prescriptions` · `MedicalBills` · `Payments` · `InsuranceClaims` · `ChatHistory` · `Notifications` · `Roles`

---

## ⚙️ Non-Functional Requirements

- **Security:** JWT Authentication, Password Encryption, Role-Based Access, Secure APIs, Data Backup
- **Performance:** Response time under 2 seconds, fast database queries, optimized APIs
- **Scalability:** Architecture supports future AI modules and additional hospital services without major redesign

---

## 🗓️ Development Roadmap (2 Weeks)

### Week 1
| Day | Task |
|-----|------|
| 1 | Project setup, Database Design, GitHub Repository |
| 2 | Authentication |
| 3 | Patient Module |
| 4 | Doctor Module |
| 5 | Appointment Module |
| 6 | Medical Billing System |
| 7 | Dashboard Integration & Testing |

### Week 2
| Day | Task |
|-----|------|
| 8 | Medical Report Summarizer |
| 9 | Smart Doctor Recommendation |
| 10 | AI Chatbot |
| 11 | Billing Integration, Invoice Generation, Payment Module |
| 12 | API Integration, FastAPI AI Services, Final Backend Testing |
| 13 | System Testing, Bug Fixes |
| 14 | Deployment, Documentation, Final Presentation |

---

## 👨‍💻 Team Responsibilities

- **Frontend Developer 1:** Login, Dashboard, Navigation, UI Components
- **Frontend Developer 2:** CRUD Forms, Appointment Pages, Billing Pages, Responsive Design
- **Backend Developer:** Authentication APIs, CRUD APIs, MySQL Database, Billing APIs, Payment Module, JWT Security
- **AI Developer:** FastAPI, Report Summarizer, Doctor Recommendation, Chatbot, OpenAI Integration, Deployment

---

## 🚀 Getting Started

> These are placeholder setup instructions — update them once the project scaffolding is in place.

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MySQL

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/hospital-management-system.git
cd hospital-management-system

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Install AI service dependencies
cd ../ai-service
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in the `server/` and `ai-service/` directories with the following:

```
DATABASE_URL=
JWT_SECRET=
OPENAI_API_KEY=
```

### Running Locally

```bash
# Start backend (Express.js)
cd server
npm run dev

# Start AI service (FastAPI)
cd ai-service
uvicorn main:app --reload

# Start frontend (React)
cd client
npm start
```

---

## 🎯 Expected Outcomes

By the end of the project, the Hospital Management System will:

- Digitize hospital operations
- Provide secure, role-based access
- Manage medical services end-to-end
- Generate dynamic billing invoices
- Leverage integrated AI models to streamline clinical workflows and patient engagement

---

