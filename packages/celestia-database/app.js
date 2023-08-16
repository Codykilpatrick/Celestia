const { Pool } = require('pg');
require('dotenv').config();

const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

async function getItemColumns() {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'items';");
    console.log(res.rows);
  } finally {
    client.release();
  }
}

getItemColumns();