const { Pool } = require("pg");

require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "gst_ai_agent",
  password: process.env.DB_PASSWORD || "naveen",
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;