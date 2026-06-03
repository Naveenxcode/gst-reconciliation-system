const { runReconciliation } = require("../services/pythonService");
const { saveResults } = require("../services/dbService");
const pool = require("../db/db");

exports.uploadFiles = async (req, res) => {
  try {
    const purchaseFile = req.files["purchase"][0].path;
    const gstr2bFile = req.files["gstr2b"][0].path;

    const result = await runReconciliation(purchaseFile, gstr2bFile);

    await saveResults(result);

    res.json({
      message: "Reconciliation complete & saved",
      data: result,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





exports.getAllResults = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reconciliation_results ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'MATCHED') AS matched,
        COUNT(*) FILTER (WHERE status = 'MISSING_IN_2B') AS missing_in_2b,
        COUNT(*) FILTER (WHERE status = 'MISSING_IN_BOOKS') AS missing_in_books,
        COUNT(*) FILTER (WHERE status = 'MISMATCH_AMOUNT') AS mismatch_amount
      FROM reconciliation_results
    `);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFilteredResults = async (req, res) => {
  try {
    const { status, gstin } = req.query;

    let query = "SELECT * FROM reconciliation_results WHERE 1=1";
    let values = [];

    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }

    if (gstin) {
      values.push(gstin);
      query += ` AND gstin = $${values.length}`;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getVendorInsights = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        gstin,
        COUNT(*) AS total_invoices,
        COUNT(*) FILTER (WHERE status = 'MISSING_IN_2B') AS missing_in_2b,
        COUNT(*) FILTER (WHERE status = 'MISMATCH_AMOUNT') AS mismatch_amount,
        COUNT(*) FILTER (WHERE status = 'MATCHED') AS matched
      FROM reconciliation_results
      GROUP BY gstin
      ORDER BY missing_in_2b DESC
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

