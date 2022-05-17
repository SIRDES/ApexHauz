const db = require("../../config/db.config");

const createTableUSers = `CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone varchar(20),
  address varchar(255),
  password VARCHAR(255) NOT NULL,
  is_admin Boolean,
  created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
  )`
  
const usersTable =()=> {
  console.log("creating users table...")
db.query(createTableUSers, (error, data) => {
  if (error) {
    return console.log(error.message);
  }
  console.log("users table created")
  process.exit(0);
});
}
usersTable()
//   (() => {
  
// })();
