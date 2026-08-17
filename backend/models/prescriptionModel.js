// models/prescriptionModel.js

const db = require('../config/db');

const getAllPrescriptions = async () => {
  const [rows] = await db.query(
    `SELECT pr.prescription_id, pr.medicines, pr.dosage_instructions, pr.notes, pr.created_at,
            a.appointment_id, a.appointment_date,
            up.name AS patient_name, ud.name AS doctor_name
     FROM prescriptions pr
     JOIN appointments a ON pr.appointment_id = a.appointment_id
     JOIN patients p ON a.patient_id = p.patient_id
     JOIN users up ON p.user_id = up.user_id
     JOIN doctors d ON a.doctor_id = d.doctor_id
     JOIN users ud ON d.user_id = ud.user_id`
  );
  return rows;
};

const getPrescriptionById = async (prescriptionId) => {
  const [rows] = await db.query(
    `SELECT pr.prescription_id, pr.medicines, pr.dosage_instructions, pr.notes, pr.created_at,
            a.appointment_id, a.appointment_date,
            up.name AS patient_name, ud.name AS doctor_name
     FROM prescriptions pr
     JOIN appointments a ON pr.appointment_id = a.appointment_id
     JOIN patients p ON a.patient_id = p.patient_id
     JOIN users up ON p.user_id = up.user_id
     JOIN doctors d ON a.doctor_id = d.doctor_id
     JOIN users ud ON d.user_id = ud.user_id
     WHERE pr.prescription_id = ?`,
    [prescriptionId]
  );
  return rows[0];
};

const getPrescriptionsByAppointmentId = async (appointmentId) => {
  const [rows] = await db.query(
    'SELECT * FROM prescriptions WHERE appointment_id = ?',
    [appointmentId]
  );
  return rows;
};

const createPrescription = async (data) => {
  const [result] = await db.query(
    'INSERT INTO prescriptions (appointment_id, medicines, dosage_instructions, notes) VALUES (?, ?, ?, ?)',
    [data.appointmentId, data.medicines, data.dosageInstructions, data.notes]
  );
  return result.insertId;
};

const updatePrescription = async (prescriptionId, data) => {
  await db.query(
    'UPDATE prescriptions SET medicines = ?, dosage_instructions = ?, notes = ? WHERE prescription_id = ?',
    [data.medicines, data.dosageInstructions, data.notes, prescriptionId]
  );
};

const deletePrescription = async (prescriptionId) => {
  await db.query('DELETE FROM prescriptions WHERE prescription_id = ?', [prescriptionId]);
};

module.exports = {
  getAllPrescriptions,
  getPrescriptionById,
  getPrescriptionsByAppointmentId,
  createPrescription,
  updatePrescription,
  deletePrescription
};