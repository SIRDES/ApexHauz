const db = require("../../config/db.config");

const createTableReports = `CREATE TABLE IF NOT EXISTS reports (
  report_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  property_id INT UNSIGNED NOT NULL,
  reason varchar(255),
  description varchar(255),
  user_id INT UNSIGNED NOT NULL,
  created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE
  )`
  
  const reportsTable = () => {
  console.log("creating reports table...");

  db.query(createTableReports, (error, data) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("reports table created")
    process.exit(0);
  });
}
reportsTable();
