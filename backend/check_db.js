const mysql = require('mysql2/promise');

async function check() {
  const connection = await mysql.createConnection({
    host: 'hms-db-hms-0585.e.aivencloud.com',
    port: 13023,
    user: 'avnadmin',
    password: process.env.DB_PASSWORD,
    database: 'defaultdb',
    ssl: { rejectUnauthorized: false }
  });

  const [rows] = await connection.query('SHOW DATABASES;');
  console.log('Databases:', rows);
  await connection.end();
}

check();
