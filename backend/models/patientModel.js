// models/patientModel.js

const db = require('../config/db');

const getAllPatients = async () => {
  const [rows] = await db.query(
    `SELECT p.patient_id, p.date_of_birth, p.gender, p.blood_group,
            p.address, p.emergency_contact,
            u.user_id, u.name, u.email, u.phone
     FROM patients p
     JOIN users u ON p.user_id = u.user_id`
  );
  return rows;
};

const getPatientById = async (patientId) => {
  const [rows] = await db.query(
    `SELECT p.patient_id, p.date_of_birth, p.gender, p.blood_group,
            p.address, p.emergency_contact,
            u.user_id, u.name, u.email, u.phone
     FROM patients p
     JOIN users u ON p.user_id = u.user_id
     WHERE p.patient_id = ?`,
    [patientId]
  );
  return rows[0];
};

const createPatientWithUser = async (userData, patientData) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [roleRows] = await connection.query(
      'SELECT role_id FROM roles WHERE role_name = ?',
      ['patient']
    );
    const roleId = roleRows[0]?.role_id;

    const [userResult] = await connection.query(
      'INSERT INTO users (role_id, name, email, password_hash, phone) VALUES (?, ?, ?, ?, ?)',
      [roleId, userData.name, userData.email, userData.hashedPassword, userData.phone]
    );
    const userId = userResult.insertId;

    const [patientResult] = await connection.query(
      'INSERT INTO patients (user_id, date_of_birth, gender, blood_group, address, emergency_contact) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, patientData.dateOfBirth, patientData.gender, patientData.bloodGroup, patientData.address, patientData.emergencyContact]
    );

    await connection.commit();
    return { userId, patientId: patientResult.insertId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const updatePatient = async (patientId, patientData) => {
  await db.query(
    'UPDATE patients SET date_of_birth = ?, gender = ?, blood_group = ?, address = ?, emergency_contact = ? WHERE patient_id = ?',
    [patientData.dateOfBirth, patientData.gender, patientData.bloodGroup, patientData.address, patientData.emergencyContact, patientId]
  );
};

const deletePatient = async (patientId) => {
  await db.query('DELETE FROM patients WHERE patient_id = ?', [patientId]);
};

const findUserByEmailForPatient = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatientWithUser,
  updatePatient,
  deletePatient,
  findUserByEmailForPatient
};