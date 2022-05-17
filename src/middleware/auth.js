const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../utils/secrets")
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    db.query("SELECT * FROM tokens WHERE token=?", [token], (err, results) => {
      if (err) {
        res
          .status(401)
          .send({ status: "error", error: "Authentication error" });
        return;
      }
      if (results.length) {
        const decoded = jwt.verify(results[0].token, JWT_SECRET);
        db.query(
          "SELECT * From users WHERE id=?",
          [decoded.id],
          (err, data) => {
            if (err) {
              res
                .status(401)
                .send({ status: "error", error: "Authentication error" });
                return
            }
            if (data.length) {
              req.token = token;
              delete data[0].password
              req.user = data[0];
              next();
              return;
            } else {
              res
                .status(401)
                .send({ status: "error", error: "Use is logged out" });
            }
          }
        );
      } 
      else {
        res
          .status(401)
          .send({ status: "error", error: "User is logged out" });
      }
    });
  } catch (error) {
    res.status(401).send({ status: "error", error: "Authentication error" });
  }
};

module.exports = auth;
