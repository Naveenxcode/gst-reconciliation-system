const { exec } = require("child_process");
const path = require("path");

exports.runReconciliation = (purchasePath, gstr2bPath) => {
  return new Promise((resolve, reject) => {
    
    const scriptPath = path.join(
      __dirname,
      "../../python-service/reconcile.py"
    );

    const command = `python "${scriptPath}" "${purchasePath}" "${gstr2bPath}"`;

    console.log("Running:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Python Error:", stderr);
        return reject(error);
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (err) {
        console.error("JSON Parse Error:", stdout);
        reject(err);
      }
    });
  });
};


