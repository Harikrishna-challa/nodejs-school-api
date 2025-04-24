const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "bzjbs8cbdsiluxrclkg7-mysql.services.clever-cloud.com",         // from clever cloud
  port: 3306,
  user: "utwgfdhptctjihge",
  password: "GxZnbsaVNdeyxqzGifo8",
  database: "bzjbs8cbdsiluxrclkg7",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to the database:", err.message);
    return;
  }
  console.log("✅ Connected to Clever Cloud MySQL!");
});

module.exports = db;
