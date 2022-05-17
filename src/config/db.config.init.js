const mysql = require("mysql2");
require("dotenv/config")

const { HOST, DB, DB_PASSWORD, DB_USERNAME } = require("../utils/secrets");
// console.log(HOST);
const connection = mysql.createConnection({
  host: HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database created");
  // console.log(process.env.DBNAME);
});

module.exports = connection;
