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

module.exports = {
  getAllBills,
  getBillById,
  getBillsByPatientId,
  createBill,
  updateBillStatus,
  createPayment,
  getPaymentsByBillId
};