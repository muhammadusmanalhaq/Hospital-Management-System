// models/billModel.js

const db = require('../config/db');

const getAllBills = async () => {
  const [rows] = await db.query(
    `SELECT b.*, up.name AS patient_name
     FROM medical_bills b
     JOIN patients p ON b.patient_id = p.patient_id
     JOIN users up ON p.user_id = up.user_id`
  );
  return rows;
};

const getBillById = async (billId) => {
  const [rows] = await db.query(
    `SELECT b.*, up.name AS patient_name
     FROM medical_bills b
     JOIN patients p ON b.patient_id = p.patient_id
     JOIN users up ON p.user_id = up.user_id
     WHERE b.bill_id = ?`,
    [billId]
  );
  return rows[0];
};

const getBillsByPatientId = async (patientId) => {
  const [rows] = await db.query(
    'SELECT * FROM medical_bills WHERE patient_id = ?',
    [patientId]
  );
  return rows;
};

const createBill = async (data) => {
  const [result] = await db.query(
    `INSERT INTO medical_bills
     (patient_id, appointment_id, consultation_charge, lab_charge, medicine_charge, hospital_charge, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.patientId,
      data.appointmentId,
      data.consultationCharge || 0,
      data.labCharge || 0,
      data.medicineCharge || 0,
      data.hospitalCharge || 0,
      data.status || 'pending'
    ]
  );
  return result.insertId;
};

const updateBillStatus = async (billId, status) => {
  await db.query('UPDATE medical_bills SET status = ? WHERE bill_id = ?', [status, billId]);
};

const createPayment = async (data) => {
  const [result] = await db.query(
    'INSERT INTO payments (bill_id, amount_paid, payment_method, transaction_id, status) VALUES (?, ?, ?, ?, ?)',
    [data.billId, data.amountPaid, data.paymentMethod, data.transactionId, data.status || 'success']
  );
  return result.insertId;
};

const getPaymentsByBillId = async (billId) => {
  const [rows] = await db.query('SELECT * FROM payments WHERE bill_id = ?', [billId]);
  return rows;
};

const createInsuranceClaim = async (data) => {
  const [result] = await db.query(
    'INSERT INTO insurance_claims (bill_id, patient_id, insurance_provider, policy_number, claim_amount) VALUES (?, ?, ?, ?, ?)',
    [data.billId, data.patientId, data.insuranceProvider, data.policyNumber, data.claimAmount]
  );
  return result.insertId;
};

const updateClaimStatus = async (claimId, status) => {
  await db.query('UPDATE insurance_claims SET claim_status = ? WHERE claim_id = ?', [status, claimId]);
};

const getRevenueSummary = async () => {
  const [rows] = await db.query(
    `SELECT
       COUNT(*) AS total_bills,
       SUM(total_amount) AS total_billed,
       SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) AS total_collected,
       SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END) AS total_pending
     FROM medical_bills`
  );
  return rows[0];
};

module.exports = {
  getAllBills,
  getBillById,
  getBillsByPatientId,
  createBill,
  updateBillStatus,
  createPayment,
  getPaymentsByBillId,
  createInsuranceClaim,
  updateClaimStatus,
  getRevenueSummary
};