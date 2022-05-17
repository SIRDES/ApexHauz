const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const { JWT_SECRET } = require("../utils/secrets");

module.exports = async function (userId) {
  const token = jwt.sign({ id: userId }, JWT_SECRET);
  db.query(
    "INSERT INTO tokens(user_id,token) values(?,?)",
    [userId, token],
    (error, res) => {
      if (error) {
        return result(error, null);
      }
      
    }
  );
  return token;
};
