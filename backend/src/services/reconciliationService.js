const xlsx = require('xlsx');

function normalizeInvoice(inv) {
  if (!inv) return "";
  return String(inv).replace(/-/g, "").replace(/\s/g, "").toUpperCase();
}

exports.runReconciliation = (purchasePath, gstr2bPath) => {
  return new Promise((resolve, reject) => {
    try {
      // Read workbooks
      const purchaseWb = xlsx.readFile(purchasePath);
      const gstr2bWb = xlsx.readFile(gstr2bPath);

      // Get first sheet
      const purchaseSheet = purchaseWb.Sheets[purchaseWb.SheetNames[0]];
      const gstr2bSheet = gstr2bWb.Sheets[gstr2bWb.SheetNames[0]];

      // Convert to JSON
      const purchaseData = xlsx.utils.sheet_to_json(purchaseSheet);
      const gstr2bData = xlsx.utils.sheet_to_json(gstr2bSheet);

      const results = [];
      const gstr2bDict = {};
      const purchaseDict = {};

      // Build gstr2b dictionary
      gstr2bData.forEach(row => {
        const gstin = row.gstin;
        const inv = normalizeInvoice(row.invoice_no);
        const amount = parseFloat(row.amount);
        gstr2bDict[`${gstin}_${inv}`] = amount;
      });

      // Build purchase dictionary
      purchaseData.forEach(row => {
        const gstin = row.gstin;
        const inv = normalizeInvoice(row.invoice_no);
        const amount = parseFloat(row.amount);
        purchaseDict[`${gstin}_${inv}`] = amount;
      });

      // Check purchase vs 2B
      for (const [key, amount] of Object.entries(purchaseDict)) {
        const [gstin, ...invParts] = key.split('_');
        const inv = invParts.join('_'); // in case invoice had an underscore
        let status = "MISSING_IN_2B";
        
        if (gstr2bDict.hasOwnProperty(key)) {
          if (amount === gstr2bDict[key]) {
            status = "MATCHED";
          } else {
            status = "MISMATCH_AMOUNT";
          }
        }
        
        results.push({
          gstin: gstin,
          invoice_no: inv,
          status: status
        });
      }

      // Check extra in 2B
      for (const key of Object.keys(gstr2bDict)) {
        if (!purchaseDict.hasOwnProperty(key)) {
          const [gstin, ...invParts] = key.split('_');
          const inv = invParts.join('_');
          results.push({
            gstin: gstin,
            invoice_no: inv,
            status: "MISSING_IN_BOOKS"
          });
        }
      }

      resolve(results);
    } catch (error) {
      console.error("Reconciliation Error:", error);
      reject(error);
    }
  });
};
