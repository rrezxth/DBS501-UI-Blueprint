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
      `BEGIN 
        get_jobs(:cursor); 
      END;`,
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

    await connection.execute(
      `BEGIN 
        EMPLOYEE_HIRE_SP(:p_first_name, :p_last_name, :p_email, :p_phone, :p_salary, :p_job_id, :p_manager_id, :p_department_id);
      END;`,
      {
        p_first_name: data.p_first_name, 
        p_last_name: data.p_last_name, 
        p_email: data.p_email, 
        p_phone: data.p_phone,
        p_salary: Number(data.p_salary),
        p_job_id: data.p_job_id, 
        p_manager_id: Number(data.p_manager_id),
        p_department_id: Number(data.p_department_id)
      }
    );

    return { success: true };
    
  } catch (error) {
    // Check if the ERROR: Salary value out of range
    if (error.code === 'ORA-20100') {
      return { success: false, message: 'Salary value out of range.' + error.message };
    } else {
      // Other errors
      return { success: false, message: '[DB.js] Error creating employee:' + error.message };
    }
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
      `BEGIN 
        get_employees(:cursor); 
      END;`,
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
      `SELECT GET_JOB_TITLE(:p_job_id) AS job_title FROM dual`,
      { p_job_id: jobId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

  return result.rows[0].JOB_TITLE;

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

    await connection.execute(
      `BEGIN 
        edit_employee(:p_employee_id, :p_email, :p_phone, :p_salary);
      END;`,
      {
        p_employee_id: Number(data.p_employee_id),
        p_email: data.p_email,
        p_phone: data.p_phone,
        p_salary: Number(data.p_salary)
      }
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

async function updateJob(data) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN 
        edit_job(:p_job_id, :p_job_title, :p_min_salary, :p_max_salary);
      END;`,
      {
        p_job_id: data.p_job_id,
        p_job_title: data.p_job_title,
        p_min_salary: Number(data.p_min_salary),
        p_max_salary: Number(data.p_max_salary)
      }
    );

    //console.log('Employee hired successfully.');
  } catch (err) {
    console.error('[DB.js] Error updating job:', err);
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

async function createNewJob(data) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN 
        CREATE_NEW_JOB(:p_job_id, :p_job_title, :p_min_salary, :p_max_salary);
      END;`,
      {
        p_job_id: data.p_job_id,
        p_job_title: data.p_job_title,
        p_min_salary: Number(data.p_min_salary),
        p_max_salary: Number(data.p_max_salary)
      }
    );

    return { success: true, message: "Job created successfully." };
    //console.log('Employee hired successfully.');
  } catch (error) {
    // Check if the error is a primary key constraint violation
    if (error.code === 'ORA-00001') {
      return { success: false, message: 'A job with the given ID already exists.' + error.message };
    } else {
      // Other errors
      return { success: false, message: '[DB.js] Error creating job:' + error.message };
    }
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
  updateEmployee,
  getJobTitle,
  updateJob,
  createNewJob
};
