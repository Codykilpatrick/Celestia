const { Pool } = require('pg');
e
// Connection template for remote server
const pool = new Pool({
  connectionString: "",
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