// dbConfig.js

require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,          // DB_Username
  password: process.env.DB_PASS,      // DB_Password
  connectionString: process.env.DB_CONNECTIONSTRING,    // Syntax is [Hostname]:[Port]/[ServiceName]
};

module.exports = dbConfig;
