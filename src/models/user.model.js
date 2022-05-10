const db = require("../config/db.config");
const bcrypt = require("bcrypt")
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
    this.address = address, this.is_admin = is_admin;
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
      (err, res) => {
        if (err) {
          // console.log("error ", err);
          result(err, null);
          return;
        }
        // console.log("Created user: ", { ...newUser });
        result(null, { id: res.insertId, ...newUser });
      }
    );
  }
  static login(email, result){
    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      (err, res) => {
        if (err) {
          return result(err, null);
        }
        if(res.length){
          return result(null, res[0])
        }
        
        result({kind: "not found"}, null)
      }
    );
  }
}

module.exports = User;