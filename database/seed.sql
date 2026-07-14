-- ============================================================
--  Hospital Management System — Sample Seed Data
--  Run this AFTER schema.sql. Safe for dev/test only —
--  never seed fake data like this into a real production DB.
-- ============================================================

USE hospital_management_system;

-- roles are already seeded by schema.sql (admin, doctor, patient, billing_staff)

-- Users (password_hash values below are PLACEHOLDERS — replace with
-- real bcrypt/argon2 hashes once auth is wired up; never store plaintext)
INSERT INTO users (role_id, name, email, password_hash, phone) VALUES
  (1, 'Admin User',      'admin@hms.test',        '$2b$10$placeholderadminhash',   '9990000001'),
  (2, 'Dr. Asha Mehta',  'asha.mehta@hms.test',   '$2b$10$placeholderdoctorhash', '9990000002'),
  (2, 'Dr. Raj Kapoor',  'raj.kapoor@hms.test',   '$2b$10$placeholderdoctorhash', '9990000003'),
  (3, 'Priya Sharma',    'priya.sharma@hms.test', '$2b$10$placeholderpatienthash','9990000004'),
  (3, 'Karan Verma',     'karan.verma@hms.test',  '$2b$10$placeholderpatienthash','9990000005');

INSERT INTO departments (name, description) VALUES
  ('Cardiology',    'Heart and cardiovascular care'),
  ('Ophthalmology', 'Eye care and vision');

INSERT INTO doctors (user_id, department_id, specialization, qualification, experience_years, consultation_fee) VALUES
  (2, 1, 'Cardiologist',    'MD Cardiology',    8, 800.00),
  (3, 2, 'Ophthalmologist', 'MS Ophthalmology', 5, 600.00);

INSERT INTO patients (user_id, date_of_birth, gender, blood_group, address, emergency_contact) VALUES
  (4, '1994-05-12', 'female', 'O+', '12 MG Road, Pune',     '9990000099'),
  (5, '1989-11-03', 'male',   'B+', '45 Park Street, Delhi','9990000098');

INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time) VALUES
  (1, 'MON', '09:00:00', '13:00:00'),
  (1, 'WED', '09:00:00', '13:00:00'),
  (2, 'TUE', '10:00:00', '16:00:00');

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason) VALUES
  (1, 1, '2026-07-20', '09:30:00', 'confirmed', 'Chest pain follow-up'),
  (2, 2, '2026-07-21', '11:00:00', 'pending',   'Annual eye checkup');

INSERT INTO medical_bills (patient_id, appointment_id, consultation_charge, lab_charge, medicine_charge, hospital_charge, status) VALUES
  (1, 1, 800.00, 500.00, 150.00, 0.00, 'pending');

INSERT INTO payments (bill_id, amount_paid, payment_method, status) VALUES
  (1, 500.00, 'card', 'success');
