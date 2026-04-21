const pool = require("../db/db");
const { askAI } = require("../services/aiService");

exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    // Fetch data (limit for now)
    const dbData = await pool.query(
      "SELECT * FROM reconciliation_results LIMIT 100"
    );

    const answer = await askAI(question, dbData.rows);

    res.json({ answer });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};