const db = require('../config/db');

const createUser = async (roleId, name, email, hashedPassword) => {
  const [result] = await db.query(
    'INSERT INTO users (role_id, name, email, password_hash) VALUES (?, ?, ?, ?)',
    [roleId, name, email, hashedPassword]
  );
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

const getRoleIdByName = async (roleName) => {
  const [rows] = await db.query(
    'SELECT role_id FROM roles WHERE role_name = ?',
    [roleName]
  );
  return rows[0]?.role_id;
};

module.exports = {
  createUser,
  findUserByEmail,
  getRoleIdByName
};
const updatePassword = async (userId, hashedPassword) => {
  await db.query(
    'UPDATE users SET password_hash = ? WHERE user_id = ?',
    [hashedPassword, userId]
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  getRoleIdByName,
  updatePassword
};