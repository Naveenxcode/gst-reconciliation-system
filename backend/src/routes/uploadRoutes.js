const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const {
  uploadFiles,
  getAllResults,
  getSummary,
  getFilteredResults,
  getVendorInsights, 
} = require("../controllers/uploadController");

router.post(
  "/upload",
  upload.fields([
    { name: "purchase", maxCount: 1 },
    { name: "gstr2b", maxCount: 1 },
  ]),
  uploadFiles
);

router.get("/reconciliation", getAllResults);
router.get("/summary", getSummary);
router.get("/filter", getFilteredResults);
router.get("/vendor-insights", getVendorInsights);

module.exports = router; 