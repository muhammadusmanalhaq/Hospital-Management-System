// models/appointmentModel.js

const db = require('../config/db');

const getAllAppointments = async () => {
  const [rows] = await db.query(
    `SELECT a.appointment_id, a.appointment_date, a.appointment_time,
            a.status, a.reason, a.created_at,
            p.patient_id, up.name AS patient_name,
            d.doctor_id, ud.name AS doctor_name
     FROM appointments a
     JOIN patients p ON a.patient_id = p.patient_id
     JOIN users up ON p.user_id = up.user_id
     JOIN doctors d ON a.doctor_id = d.doctor_id
     JOIN users ud ON d.user_id = ud.user_id`
  );
  return rows;
};

const getAppointmentById = async (appointmentId) => {
  const [rows] = await db.query(
    `SELECT a.appointment_id, a.appointment_date, a.appointment_time,
            a.status, a.reason, a.created_at,
            p.patient_id, up.name AS patient_name,
            d.doctor_id, ud.name AS doctor_name
     FROM appointments a
     JOIN patients p ON a.patient_id = p.patient_id
     JOIN users up ON p.user_id = up.user_id
     JOIN doctors d ON a.doctor_id = d.doctor_id
     JOIN users ud ON d.user_id = ud.user_id
     WHERE a.appointment_id = ?`,
    [appointmentId]
  );
  return rows[0];
};

const createAppointment = async (data) => {
  const [result] = await db.query(
    'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason) VALUES (?, ?, ?, ?, ?, ?)',
    [data.patientId, data.doctorId, data.appointmentDate, data.appointmentTime, data.status || 'pending', data.reason]
  );
  return result.insertId;
};

const updateAppointment = async (appointmentId, data) => {
  await db.query(
    'UPDATE appointments SET appointment_date = ?, appointment_time = ?, status = ?, reason = ? WHERE appointment_id = ?',
    [data.appointmentDate, data.appointmentTime, data.status, data.reason, appointmentId]
  );
};

const deleteAppointment = async (appointmentId) => {
  await db.query('DELETE FROM appointments WHERE appointment_id = ?', [appointmentId]);
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};