const { Pool } = require("pg");

require('dotenv').config();

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } // Required for Render external/cloud DBs
    }
  : {
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "gst_ai_agent",
      password: process.env.DB_PASSWORD || "naveen",
      port: process.env.DB_PORT || 5432,
    };

const pool = new Pool(poolConfig);

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reconciliation_results (
        id SERIAL PRIMARY KEY,
        gstin TEXT NOT NULL,
        invoice_no TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Database initialized & table verified.");
  } catch (error) {
    console.error("Database Initialization Error: ", error.message);
  }
};

initDB();

module.exports = pool;