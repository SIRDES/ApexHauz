// const { logger } = require("../../utils/logger");
// const { createDB: createDBQuery } = require("../queries");
require("dotenv").config()

const {DB_NAME} =require("../secrets")
console.log(DB_NAME)
const createDBQuery = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const DBUp = ()=> {
require("../../config/db.config.init").query(createDBQuery, (err, _) => {
  if (err) {
    console.log(err.message);
    return;
  }else{
    console.log("DB created!");
    process.exit(0);
  }
  
});
}
DBUp()