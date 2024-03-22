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

    const result = await connection.execute(
      `BEGIN get_jobs(:cursor); END;`,
      { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
    );

    const resultSet = result.outBinds.cursor;
    const rows = [];    // to be returned
  
    let rowArray;       // to save current row and be pushed into the array
    while ((rowArray = await resultSet.getRow())) {
      rows.push(rowArray);
    }

    await resultSet.close();
    return rows; 

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

    const result = await connection.execute(
      `BEGIN get_managers(:cursor); END;`,
      { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
    );

    const resultSet = result.outBinds.cursor;
    const rows = [];
  
    let rowArray;
    while ((rowArray = await resultSet.getRow())) {
      rows.push(rowArray);
    }

    await resultSet.close();
    return rows; 

  } catch (err) {
    console.error('Error retrieving manager information:', err);
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

async function getDepartmentsInfo() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN get_departments(:cursor); END;`,
      { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
    );

    const resultSet = result.outBinds.cursor;
    const rows = [];
  
    let rowArray;
    while ((rowArray = await resultSet.getRow())) {
      rows.push(rowArray);
    }

    await resultSet.close();
    return rows; 

  } catch (err) {
    console.error('Error retrieving department information:', err);
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
  getManagersInfo,
  getDepartmentsInfo
};
