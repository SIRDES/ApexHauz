const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateToken");

class User {
  constructor(
    email,
    first_name,
    last_name,
    password,
    phone,
    address,
    is_admin
  ) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.phone = phone;
    (this.address = address), (this.is_admin = is_admin);
  }
  static create(newUser, result) {
    db.query(
      "INSERT INTO users(email,first_name,last_name,password,phone,address, is_admin) values(?,?,?,?,?,?,?)",
      [
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        newUser.password,
        newUser.phone,
        newUser.address,
        newUser.is_admin,
      ],
      async (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        const token = await generateToken(res.insertId);

        result(null, { id: res.insertId, ...newUser, token });
      }
    );
  }
  static login(email, result) {
    db.query("SELECT * FROM users WHERE email=?", [email], async (err, res) => {
      if (err) {
        return result(err, null);
      }
      if (res.length) {
        const token = await generateToken(res[0].id);

        return result(null, { token, ...res[0] });
      }

      result({ kind: "not found" }, null);
    });
  }
  static signout(token, results) {
    db.query("DELETE FROM tokens where token=?", [token], (err, res) => {
      if (err) {
        results(err, null);
        return;
      }
      results(null, { kind: "success", res });
    });
  }
  static signoutAll(user_id, results) {
    db.query("DELETE FROM tokens where user_id=?", [user_id], (err, res) => {
      // console.log(res)
      if (err) {
        results(err, null);
      } else {
        results(null, { kind: "success", deletedRows: res.affectedRows });
      }
    });
  }
}

module.exports = User;