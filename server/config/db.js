// config/db.js
// MySQL connection pool for the Node.js/Express backend.
// Drop this file into server/config/db.js and require it from server.js.
//
// Install: npm install mysql2 dotenv

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Most hosted MySQL providers (Aiven, TiDB Cloud) require SSL.
  // Set DB_SSL=true in .env for those; leave unset for local MySQL.
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('MySQL connected successfully');
    conn.release();
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = { pool, testConnection };

// Usage in server.js:
//
//   const { pool, testConnection } = require('./config/db');
//   testConnection();
//
//   // Example query:
//   const [rows] = await pool.query('SELECT * FROM patients WHERE patient_id = ?', [id]);
