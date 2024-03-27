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
    console.error('[DB.js] Error connecting to the database:', err);
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
    console.error('[DB.js] Error retrieving job information:', err);
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
    console.error('[DB.js] Error retrieving manager information:', err);
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
    console.error('[DB.js] Error retrieving department information:', err);
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

async function createNewEmployee(data) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    
    // Destructure to pcs
    let { p_first_name, p_last_name, p_email, p_phone, p_salary, p_job_id, p_manager_id, p_department_id } = data;

    // Convert
    p_salary = Number(p_salary);
    p_manager_id = Number(p_manager_id);
    p_department_id = Number(p_department_id);
    
    const result = await connection.execute(
      `BEGIN 
        EMPLOYEE_HIRE_SP(:p_first_name, :p_last_name, :p_email, :p_phone, :p_salary, :p_job_id, :p_manager_id, :p_department_id);
      END;`,
      {
        p_first_name, 
        p_last_name, 
        p_email, 
        p_phone,
        p_salary,
        p_job_id, 
        p_manager_id,
        p_department_id
      }
    );

    // Commit
    await connection.commit();

    //console.log('Employee hired successfully.');
  } catch (err) {
    console.error('[DB.js] Error hiring employee:', err);
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

async function getEmployeesInfo() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN get_employees(:cursor); END;`,
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
    console.error('[DB.js] Error retrieving employees information:', err);
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

async function getJobTitle(jobId) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN GET_JOB_TITLE(:p_job_id, :p_job_title); END;`,
      {
          p_job_id: jobId,
          p_job_title: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
      }
    );
    
    return result.outBinds.p_job_title; 

  } catch (err) {
    console.error('[DB.js] Error retrieving job title information:', err);
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

async function updateEmployee(data) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    
    // Destructure data
    let { p_employee_id, p_email, p_phone, p_salary } = data;

    // Convert
    p_employee_id = Number(p_employee_id);
    p_salary = Number(p_salary);

    console.log({ p_employee_id, p_email, p_phone, p_salary });

    await connection.execute(
      `BEGIN 
        edit_employee(:p_employee_id, :p_email, :p_phone, :p_salary);
      END;`,
      {
        p_employee_id: p_employee_id,
        p_email: p_email,
        p_phone: p_phone,
        p_salary: p_salary
      },
      { autoCommit: true } 
    );

    //console.log('Employee hired successfully.');
  } catch (err) {
    console.error('[DB.js] Error updating employee:', err);
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

connectToOracle();

module.exports = {
  getJobsInfo,
  getManagersInfo,
  getDepartmentsInfo,
  createNewEmployee,
  getEmployeesInfo,
  getJobTitle,
  updateEmployee
};
