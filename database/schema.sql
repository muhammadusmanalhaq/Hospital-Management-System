-- ============================================================
--  Hospital Management System — Database Schema
--  Engine : MySQL 8.0+
--  Charset: utf8mb4
-- ============================================================

CREATE DATABASE IF NOT EXISTS hospital_management_system
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE hospital_management_system;

-- ----------------------------------------------------------
-- 1. Roles
-- ----------------------------------------------------------
CREATE TABLE roles (
    role_id     INT AUTO_INCREMENT PRIMARY KEY,
    role_name   ENUM('admin', 'doctor', 'patient', 'billing_staff') NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 2. Users  (shared login/profile table for every role)
-- ----------------------------------------------------------
CREATE TABLE users (
    user_id        INT AUTO_INCREMENT PRIMARY KEY,
    role_id        INT NOT NULL,
    name           VARCHAR(120) NOT NULL,
    email          VARCHAR(150) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    phone          VARCHAR(20),
    is_active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    INDEX idx_users_email (email)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 3. Departments
-- ----------------------------------------------------------
CREATE TABLE departments (
    department_id  INT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(100) NOT NULL UNIQUE,
    description    TEXT
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 4. Doctors  (extends users)
-- ----------------------------------------------------------
CREATE TABLE doctors (
    doctor_id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id            INT NOT NULL UNIQUE,
    department_id      INT NOT NULL,
    specialization     VARCHAR(100) NOT NULL,
    qualification       VARCHAR(150),
    experience_years    INT DEFAULT 0,
    consultation_fee    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    INDEX idx_doctors_department (department_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 5. Doctor schedules  (supports "Manage Schedule" requirement)
-- ----------------------------------------------------------
CREATE TABLE doctor_schedules (
    schedule_id   INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id     INT NOT NULL,
    day_of_week   ENUM('MON','TUE','WED','THU','FRI','SAT','SUN') NOT NULL,
    start_time    TIME NOT NULL,
    end_time      TIME NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    UNIQUE KEY uq_doctor_day (doctor_id, day_of_week)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 6. Patients  (extends users)
-- ----------------------------------------------------------
CREATE TABLE patients (
    patient_id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id             INT NOT NULL UNIQUE,
    date_of_birth       DATE,
    gender              ENUM('male', 'female', 'other'),
    blood_group         VARCHAR(5),
    address             VARCHAR(255),
    emergency_contact   VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 7. Appointments
-- ----------------------------------------------------------
CREATE TABLE appointments (
    appointment_id     INT AUTO_INCREMENT PRIMARY KEY,
    patient_id         INT NOT NULL,
    doctor_id          INT NOT NULL,
    appointment_date   DATE NOT NULL,
    appointment_time   TIME NOT NULL,
    status             ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    reason             VARCHAR(255),
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    INDEX idx_appt_date (appointment_date),
    INDEX idx_appt_doctor_date (doctor_id, appointment_date),
    INDEX idx_appt_patient (patient_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 8. Medical reports
-- ----------------------------------------------------------
CREATE TABLE medical_reports (
    report_id     INT AUTO_INCREMENT PRIMARY KEY,
    patient_id    INT NOT NULL,
    doctor_id     INT,
    report_type   VARCHAR(100) NOT NULL,
    file_path     VARCHAR(255) NOT NULL,
    ai_summary    TEXT,
    upload_date   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE SET NULL,
    INDEX idx_reports_patient (patient_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 9. Prescriptions
-- ----------------------------------------------------------
CREATE TABLE prescriptions (
    prescription_id       INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id        INT NOT NULL,
    medicines             TEXT NOT NULL,
    dosage_instructions    TEXT,
    notes                  TEXT,
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 10. Medical bills
-- ----------------------------------------------------------
CREATE TABLE medical_bills (
    bill_id               INT AUTO_INCREMENT PRIMARY KEY,
    patient_id            INT NOT NULL,
    appointment_id        INT,
    consultation_charge   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    lab_charge            DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    medicine_charge       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    hospital_charge       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount          DECIMAL(10,2) GENERATED ALWAYS AS
                             (consultation_charge + lab_charge + medicine_charge + hospital_charge) STORED,
    status                ENUM('pending', 'paid', 'partially_paid', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE SET NULL,
    INDEX idx_bills_patient (patient_id),
    INDEX idx_bills_status (status)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 11. Payments
-- ----------------------------------------------------------
CREATE TABLE payments (
    payment_id       INT AUTO_INCREMENT PRIMARY KEY,
    bill_id          INT NOT NULL,
    amount_paid      DECIMAL(10,2) NOT NULL,
    payment_method   ENUM('cash', 'card', 'upi', 'net_banking', 'insurance') NOT NULL,
    transaction_id   VARCHAR(100),
    payment_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status           ENUM('success', 'failed', 'refunded') NOT NULL DEFAULT 'success',
    FOREIGN KEY (bill_id) REFERENCES medical_bills(bill_id) ON DELETE CASCADE,
    INDEX idx_payments_bill (bill_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 12. Insurance claims
-- ----------------------------------------------------------
CREATE TABLE insurance_claims (
    claim_id            INT AUTO_INCREMENT PRIMARY KEY,
    bill_id             INT NOT NULL,
    patient_id          INT NOT NULL,
    insurance_provider  VARCHAR(150) NOT NULL,
    policy_number       VARCHAR(100) NOT NULL,
    claim_amount        DECIMAL(10,2) NOT NULL,
    claim_status        ENUM('submitted', 'under_review', 'approved', 'rejected') NOT NULL DEFAULT 'submitted',
    submitted_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES medical_bills(bill_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 13. Chat history  (AI chatbot)
-- ----------------------------------------------------------
CREATE TABLE chat_history (
    chat_id      INT AUTO_INCREMENT PRIMARY KEY,
    patient_id   INT NOT NULL,
    sender       ENUM('patient', 'bot') NOT NULL,
    message      TEXT NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    INDEX idx_chat_patient (patient_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 14. Notifications
-- ----------------------------------------------------------
CREATE TABLE notifications (
    notification_id  INT AUTO_INCREMENT PRIMARY KEY,
    user_id          INT NOT NULL,
    message          VARCHAR(255) NOT NULL,
    type             ENUM('appointment', 'billing', 'system', 'chat') NOT NULL DEFAULT 'system',
    is_read          BOOLEAN NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_notifications_user (user_id, is_read)
) ENGINE=InnoDB;

-- ============================================================
-- Seed data: roles (safe to run once)
-- ============================================================
INSERT INTO roles (role_name) VALUES
  ('admin'), ('doctor'), ('patient'), ('billing_staff');
