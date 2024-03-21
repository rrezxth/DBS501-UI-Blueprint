// dbConfig.js

require('dotenv').config(); // Load environment variables

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionString: process.env.DB_CONNECTIONSTRING,
};

module.exports = dbConfig;
