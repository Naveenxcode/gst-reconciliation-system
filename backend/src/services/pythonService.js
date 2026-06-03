const { exec } = require("child_process");

exports.runReconciliation = (purchasePath, gstr2bPath) => {
  return new Promise((resolve, reject) => {
    const command = `python ../python-service/reconcile.py ${purchasePath} ${gstr2bPath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
};


