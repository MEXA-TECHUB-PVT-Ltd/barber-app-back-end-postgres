
const { pool } = require('../config/db.config');

async function GetBarbers() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await client.query('select * from barbers');
    console.log(result)
  
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
  } finally {
    client.release();
  }
}

GetBarbers();