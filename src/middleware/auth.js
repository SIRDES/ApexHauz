const db = require("../config/db.config");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    db.query("SELECT * From users WHERE id=?", [decoded.id], (err, data) => {
      if (err) {
        throw new Error();
      }
      if (data.length) {
        req.user = data[0];
        next();
      }
      throw new Error();
    });
  } catch (error) {
    res.status(401).send({ status: "error", error: "authentication error" });
  }
};

module.exports = auth;
