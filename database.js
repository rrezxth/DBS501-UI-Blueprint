require('dotenv').config();   // write when using .env

const oracledb = require('oracledb');

async function connectToOracle() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionString: process.env.DB_CONNECTIONSTRING
    });

     console.log('Connection established HELLOOOO');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    if (connection) {
      try {
        await connection.close(); // Always close connections
      } catch (err) {
        console.error(err);
      }
    }
  }
}

connectToOracle();