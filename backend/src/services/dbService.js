const pool = require("../db/db");

exports.saveResults = async (results) => {
  for (let row of results) {
    await pool.query(
      `INSERT INTO reconciliation_results (gstin, invoice_no, status)
       VALUES ($1, $2, $3)`,
      [row.gstin, row.invoice_no, row.status]
    );
  }
};

