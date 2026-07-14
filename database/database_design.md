# Hospital Management System — Database Design

This document covers the database section of the HMS project: the schema, table-by-table breakdown, relationships, and the reasoning behind key design decisions. It pairs with `schema.sql`, which contains the runnable MySQL script.

## 1. Overview

The schema has 14 tables, organized into four groups:

- **Identity** — `roles`, `users`, `doctors`, `patients`, `departments`, `doctor_schedules`
- **Clinical** — `appointments`, `medical_reports`, `prescriptions`
- **Billing** — `medical_bills`, `payments`, `insurance_claims`
- **Support** — `chat_history`, `notifications`

`doctor_schedules` is one addition beyond the 13 tables listed in the SRS — it's needed to actually implement "Manage Schedule" under Module 3 (Doctor Management), otherwise there's nowhere to store a doctor's working hours.

## 2. Table-by-table breakdown

### roles
| Column | Type | Notes |
|---|---|---|
| role_id | INT PK | |
| role_name | ENUM | `admin`, `doctor`, `patient`, `billing_staff` |

### users
Shared login/profile table for everyone in the system, regardless of role.

| Column | Type | Notes |
|---|---|---|
| user_id | INT PK | |
| role_id | INT FK → roles | |
| name | VARCHAR(120) | |
| email | VARCHAR(150) | UNIQUE — used for login |
| password_hash | VARCHAR(255) | never store plaintext passwords |
| phone | VARCHAR(20) | |
| is_active | BOOLEAN | for disabling accounts without deleting them |
| created_at / updated_at | TIMESTAMP | |

### departments
| Column | Type | Notes |
|---|---|---|
| department_id | INT PK | |
| name | VARCHAR(100) | UNIQUE |
| description | TEXT | |

### doctors
Extends `users` with clinical/professional fields.

| Column | Type | Notes |
|---|---|---|
| doctor_id | INT PK | |
| user_id | INT FK → users | UNIQUE — one profile per user |
| department_id | INT FK → departments | |
| specialization | VARCHAR(100) | drives Smart Doctor Recommendation |
| qualification | VARCHAR(150) | |
| experience_years | INT | |
| consultation_fee | DECIMAL(10,2) | feeds the billing module |

### doctor_schedules
| Column | Type | Notes |
|---|---|---|
| schedule_id | INT PK | |
| doctor_id | INT FK → doctors | |
| day_of_week | ENUM | `MON`–`SUN` |
| start_time / end_time | TIME | |

`UNIQUE (doctor_id, day_of_week)` prevents duplicate schedule rows for the same doctor/day.

### patients
Extends `users` with patient-specific fields.

| Column | Type | Notes |
|---|---|---|
| patient_id | INT PK | |
| user_id | INT FK → users | UNIQUE |
| date_of_birth | DATE | |
| gender | ENUM | `male`, `female`, `other` |
| blood_group | VARCHAR(5) | |
| address | VARCHAR(255) | |
| emergency_contact | VARCHAR(20) | |

### appointments
| Column | Type | Notes |
|---|---|---|
| appointment_id | INT PK | |
| patient_id | INT FK → patients | |
| doctor_id | INT FK → doctors | |
| appointment_date | DATE | |
| appointment_time | TIME | |
| status | ENUM | `pending`, `confirmed`, `completed`, `cancelled` |
| reason | VARCHAR(255) | |
| created_at | TIMESTAMP | |

Indexed on `appointment_date` and on `(doctor_id, appointment_date)` since "does this doctor have a free slot on this date" is the most frequent query against this table.

### medical_reports
| Column | Type | Notes |
|---|---|---|
| report_id | INT PK | |
| patient_id | INT FK → patients | |
| doctor_id | INT FK → doctors, nullable | `ON DELETE SET NULL` — a report shouldn't vanish if the uploading doctor's account is removed |
| report_type | VARCHAR(100) | e.g. "Blood Test", "X-Ray" |
| file_path | VARCHAR(255) | path/URL to the stored file |
| ai_summary | TEXT | output of the Medical Report Summarizer |
| upload_date | TIMESTAMP | |

### prescriptions
| Column | Type | Notes |
|---|---|---|
| prescription_id | INT PK | |
| appointment_id | INT FK → appointments | |
| medicines | TEXT | consider a separate `prescription_items` table if you need structured, queryable medicine data later |
| dosage_instructions | TEXT | |
| notes | TEXT | |
| created_at | TIMESTAMP | |

### medical_bills
| Column | Type | Notes |
|---|---|---|
| bill_id | INT PK | |
| patient_id | INT FK → patients | |
| appointment_id | INT FK → appointments, nullable | a bill can exist without a specific appointment (e.g. a walk-in lab charge) |
| consultation_charge / lab_charge / medicine_charge / hospital_charge | DECIMAL(10,2) | individual line items |
| total_amount | DECIMAL(10,2) **generated column** | auto-computed as the sum of the four charges — see §4 |
| status | ENUM | `pending`, `paid`, `partially_paid`, `cancelled` |
| created_at | TIMESTAMP | |

### payments
| Column | Type | Notes |
|---|---|---|
| payment_id | INT PK | |
| bill_id | INT FK → medical_bills | a bill can have multiple payments (partial payments over time) |
| amount_paid | DECIMAL(10,2) | |
| payment_method | ENUM | `cash`, `card`, `upi`, `net_banking`, `insurance` |
| transaction_id | VARCHAR(100) | external gateway reference |
| payment_date | TIMESTAMP | |
| status | ENUM | `success`, `failed`, `refunded` |

### insurance_claims
| Column | Type | Notes |
|---|---|---|
| claim_id | INT PK | |
| bill_id | INT FK → medical_bills | |
| patient_id | INT FK → patients | denormalized on purpose — see §4 |
| insurance_provider | VARCHAR(150) | |
| policy_number | VARCHAR(100) | |
| claim_amount | DECIMAL(10,2) | |
| claim_status | ENUM | `submitted`, `under_review`, `approved`, `rejected` |
| submitted_date | TIMESTAMP | |

### chat_history
| Column | Type | Notes |
|---|---|---|
| chat_id | INT PK | |
| patient_id | INT FK → patients | |
| sender | ENUM | `patient` or `bot` |
| message | TEXT | |
| created_at | TIMESTAMP | |

### notifications
| Column | Type | Notes |
|---|---|---|
| notification_id | INT PK | |
| user_id | INT FK → users | works for any role, not just patients |
| message | VARCHAR(255) | |
| type | ENUM | `appointment`, `billing`, `system`, `chat` |
| is_read | BOOLEAN | |
| created_at | TIMESTAMP | |

## 3. Relationships summary

- One **role** has many **users**.
- One **user** optionally extends into one **doctor** profile *or* one **patient** profile (not both).
- One **department** has many **doctors**.
- One **doctor** has many **doctor_schedules**, **appointments**, and **medical_reports** (as uploader).
- One **patient** has many **appointments**, **medical_reports**, **chat_history** entries, and (via bills) **payments**.
- One **appointment** optionally produces one **prescription** and one **medical_bill**.
- One **medical_bill** can have many **payments** (supports partial payment) and at most one **insurance_claim**.

## 4. Design decisions & normalization notes

**Why a shared `users` table instead of separate login tables per role?**
Authentication (email, password, JWT identity) is identical across admin/doctor/patient/billing staff. Splitting it out avoids duplicating auth logic three times and keeps Module 1 (Authentication) role-agnostic. `doctors` and `patients` then hold only the fields specific to that role — this is a standard "table-per-subtype" pattern and keeps things in 3NF (no field depends on anything other than its own table's key).

**Why is `total_amount` a generated column?**
Storing a total that's just a sum of other columns in the same row invites drift (someone updates `lab_charge` and forgets to update `total_amount`). `GENERATED ALWAYS AS (...) STORED` lets MySQL compute and persist it automatically, so it's always correct and still indexable/queryable like a normal column.

**Why does `insurance_claims` store `patient_id` even though it's reachable via `bill_id → medical_bills.patient_id`?**
This is a deliberate, minor denormalization for query convenience — "show all claims for patient X" is a common billing-dashboard query, and duplicating the FK avoids a join for it. It costs almost nothing since patient_id on a claim never changes independently of the bill.

**Why `ON DELETE CASCADE` in some places and `ON DELETE SET NULL` in others?**
- `CASCADE` is used where the child row is meaningless without the parent (e.g. a `doctor_schedule` without its `doctor`, a `payment` without its `bill`).
- `SET NULL` is used where the record should survive even if the referenced person's account is removed (e.g. a `medical_report.doctor_id` — the report itself is still part of the patient's medical history even if that doctor account is later deleted).

**Why ENUM instead of a free-text status column?**
Status fields (`appointment.status`, `medical_bills.status`, `payments.status`, etc.) have a small, fixed set of valid values. ENUM enforces that at the database level, which is cheap insurance against bad data from application bugs.

**Indexing strategy**
Indexes were added on foreign keys used in frequent lookups (`appointments.doctor_id + appointment_date`, `medical_bills.patient_id`, `notifications.user_id + is_read`) rather than on every column — over-indexing slows down writes for no benefit on a project this size.

## 5. Running the schema

```bash
mysql -u root -p < schema.sql
```

This creates the `hospital_management_system` database, all 14 tables in dependency order, and seeds the four base roles. Your `.env` / ORM connection string should point at this database name.

## 6. Possible follow-ups (not required for the 2-week scope, worth flagging to the team)

- A `prescription_items` table if the billing/pharmacy side ever needs to itemize individual medicines rather than storing them as one text blob.
- A `patient_insurance` table if patients can be pre-registered with an insurance provider before a claim is ever filed.
- Soft-delete (`deleted_at`) columns on `users` if the admin dashboard needs to "deactivate" rather than hard-delete accounts with appointment history attached.
