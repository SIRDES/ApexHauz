const db = require("../../config/db.config");

const createTableTokens = `CREATE TABLE IF NOT EXISTS tokens (
  token_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  token varchar(255) NOT NULL,
  created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`
  
  const tokensTable = ()=> {
  console.log("creating tokens table...");

db.query(createTableTokens, (error, data) => {
  if (error) {
    return console.log(error.message);
  }
  console.log("tokens table created")
  process.exit(0);
});
  }
tokensTable()

//   (() => {
  
// })();
