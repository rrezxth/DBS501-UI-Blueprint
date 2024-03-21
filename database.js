// database.js

require('dotenv').config();   // required when using .env

const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');

async function connectToOracle() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig); // Use dbConfig for connection details
    console.log('Connection established to the Database.');

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

// ---------------------------------------------------------
// OTHER functions -- call procedures here


async function getJobsInfo() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`SELECT * FROM hr_jobs`);
    return result.rows;

  } catch (err) {
    console.error('Error retrieving job information:', err);
    throw err;
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






module.exports = { connectToOracle, getJobsInfo };
