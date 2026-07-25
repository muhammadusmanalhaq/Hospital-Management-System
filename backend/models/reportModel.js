// models/reportModel.js

const db = require('../config/db');

const getReportsByPatientId = async (patientId) => {
  const [rows] = await db.query(
    'SELECT * FROM medical_reports WHERE patient_id = ? ORDER BY upload_date DESC',
    [patientId]
  );
  return rows;
};

const getReportById = async (reportId) => {
  const [rows] = await db.query(
    'SELECT * FROM medical_reports WHERE report_id = ?',
    [reportId]
  );
  return rows[0];
};

const createReport = async (data) => {
  const [result] = await db.query(
    'INSERT INTO medical_reports (patient_id, doctor_id, report_type, file_path) VALUES (?, ?, ?, ?)',
    [data.patientId, data.doctorId, data.reportType, data.filePath]
  );
  return result.insertId;
};

const deleteReport = async (reportId) => {
  await db.query('DELETE FROM medical_reports WHERE report_id = ?', [reportId]);
};

module.exports = {
  getReportsByPatientId,
  getReportById,
  createReport,
  deleteReport
};