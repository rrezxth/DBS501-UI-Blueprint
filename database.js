require('dotenv').config();   // required when using .env

const oracledb = require('oracledb');

async function connectToOracle() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionString: process.env.DB_CONNECTIONSTRING
    });

     console.log('Connection established to the Database.');

     // Testing some table
    const result = await connection.execute(`SELECT * FROM hr_jobs`);
    console.log('Query result:', result);

  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

connectToOracle();
