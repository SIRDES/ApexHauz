const { DB_NAME } = require("../secrets");

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

(() => {
  require("../../config/db.config").query(dropDB, (err, _) => {
    if (err) {
      return console.log(err.message);
    }
    console.log(`Database ${DB_NAME} deleted`)
    process.exit(0);
  });
})();
