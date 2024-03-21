// database.js

const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Testing
async function connectToOracle() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig); 
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
// Functions -- call procedures here


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

async function getManagersInfo() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`SELECT *
                                            FROM hr_employees e
                                            JOIN hr_departments d ON e.department_id = d.department_id
                                            WHERE e.employee_id = d.manager_id;`);
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

module.exports = {
  getJobsInfo,
  getManagersInfo
};
