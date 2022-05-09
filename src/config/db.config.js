const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
  // console.log(process.env.DBNAME);
});

module.exports = connection;
