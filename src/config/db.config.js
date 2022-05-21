const mysql = require("mysql");

const { HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = require("../utils/secrets");
const connection = mysql.createConnection({
  host: HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

module.exports = connection;
