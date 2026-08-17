const mysql = require('mysql2/promise');
const fs = require('fs');

async function runSQL() {
  const connection = await mysql.createConnection({
    host: 'hms-db-hms-0585.e.aivencloud.com',
    port: 13023,
    user: 'avnadmin',
    password: process.env.DB_PASSWORD,
    database: 'defaultdb',
    ssl: { rejectUnauthorized: false },
    multipleStatements: true
  });

  console.log('Connected to DB');

  try {
    const schemaSql = fs.readFileSync('../database/schema.sql', 'utf8');
    await connection.query(schemaSql);
    console.log('Schema created');

    const seedSql = fs.readFileSync('../database/seed.sql', 'utf8');
    await connection.query(seedSql);
    console.log('Data seeded');
  } catch (error) {
    console.error('Error executing SQL', error.message);
  } finally {
    await connection.end();
  }
}

runSQL();
