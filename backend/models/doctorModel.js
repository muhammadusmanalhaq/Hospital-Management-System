// models/doctorModel.js

const db = require('../config/db');

const getAllDoctors = async () => {
  const [rows] = await db.query(
    `SELECT d.doctor_id, d.specialization, d.qualification,
            d.experience_years, d.consultation_fee,
            u.user_id, u.name, u.email, u.phone,
            dept.department_id, dept.name AS department_name
     FROM doctors d
     JOIN users u ON d.user_id = u.user_id
     JOIN departments dept ON d.department_id = dept.department_id`
  );
  return rows;
};

const getDoctorById = async (doctorId) => {
  const [rows] = await db.query(
    `SELECT d.doctor_id, d.specialization, d.qualification,
            d.experience_years, d.consultation_fee,
            u.user_id, u.name, u.email, u.phone,
            dept.department_id, dept.name AS department_name
     FROM doctors d
     JOIN users u ON d.user_id = u.user_id
     JOIN departments dept ON d.department_id = dept.department_id
     WHERE d.doctor_id = ?`,
    [doctorId]
  );
  return rows[0];
};

const createDoctorWithUser = async (userData, doctorData) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [roleRows] = await connection.query(
      'SELECT role_id FROM roles WHERE role_name = ?',
      ['doctor']
    );
    const roleId = roleRows[0]?.role_id;

    const [userResult] = await connection.query(
      'INSERT INTO users (role_id, name, email, password_hash, phone) VALUES (?, ?, ?, ?, ?)',
      [roleId, userData.name, userData.email, userData.hashedPassword, userData.phone]
    );
    const userId = userResult.insertId;

    const [doctorResult] = await connection.query(
      'INSERT INTO doctors (user_id, department_id, specialization, qualification, experience_years, consultation_fee) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, doctorData.departmentId, doctorData.specialization, doctorData.qualification, doctorData.experienceYears, doctorData.consultationFee]
    );

    await connection.commit();
    return { userId, doctorId: doctorResult.insertId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const updateDoctor = async (doctorId, doctorData) => {
  await db.query(
    'UPDATE doctors SET department_id = ?, specialization = ?, qualification = ?, experience_years = ?, consultation_fee = ? WHERE doctor_id = ?',
    [doctorData.departmentId, doctorData.specialization, doctorData.qualification, doctorData.experienceYears, doctorData.consultationFee, doctorId]
  );
};

const deleteDoctor = async (doctorId) => {
  await db.query('DELETE FROM doctors WHERE doctor_id = ?', [doctorId]);
};

const findUserByEmailForDoctor = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctorWithUser,
  updateDoctor,
  deleteDoctor,
  findUserByEmailForDoctor
};