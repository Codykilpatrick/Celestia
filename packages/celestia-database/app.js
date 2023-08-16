const { Pool } = require('pg');

// Connection template for remote server
const pool = new Pool({
  connectionString: "postgres://user:4XHleOFgo3xK@ep-purple-frog-870388.us-east-2.aws.neon.tech/celestia?sslmode=require",
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