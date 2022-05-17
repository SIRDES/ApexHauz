const db = require("../config/db.config");
// const bcrypt = require("bcrypt");
class Property {
  constructor(owner_id, status, price, state, city, address, type) {
    this.owner_id = owner_id;
    this.status = status;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type = type;
  }
  static create(newProperty, callback) {
    db.query(
      "INSERT INTO properties(owner_id,status,price,state,city,address, type) values(?,?,?,?,?,?,?)",
      [
        newProperty.owner_id,
        newProperty.status,
        newProperty.price,
        newProperty.state,
        newProperty.city,
        newProperty.address,
        newProperty.type,
      ],
      (err, res) => {
        if (err) {
          // console.log("error ", err);
          callback(err, null);
          return;
        }
        // console.log("Created user: ", { ...newProperty });
        callback(null, { id: res.insertId, ...newProperty });
      }
    );
  }
  static findAll(result) {
    db.query("SELECT * FROM properties", (err, res) => {
      if (err) {
        return result(err, null);
      }
      if (res.length) {
        return result(null, res);
      }

      result({ kind: "not found" }, null);
    });
  }
  static findOne(property_id, callback) {
    db.query(
      "SELECT * FROM properties WHERE property_id=?",
      [property_id],
      (err, res) => {
        if (err) {
          return callback(err, null);
        }
        if (res.length) {
          return callback(null, res[0]);
        }
        callback({ kind: "not found" }, null);
      }
    );
  }
  // find properties by type
  static findByType(type, callback) {
    db.query("SELECT * FROM properties WHERE type=?", [type], (err, res) => {
      if (err) {
        return callback(err, null);
      }
      if (res.length) {
        return callback(null, res);
      }
      callback({ kind: "not found" }, null);
    });
  }
  // This method updates the details of a property in the database
  static update(body, callback) {
    db.query(
      "SELECT * FROM properties WHERE (owner_id=? AND property_id=?)",
      [body.user_id, body.property_id],
      (error, response) => {
        if (error) {
          return callback(error, null);
        }
        if (response.length) {
          // body.updates.forEach((update)=> )
          const updateFields = Object.keys(body.updates);
          updateFields.forEach((update) => {
            db.query(
              `UPDATE properties SET ${update}=? WHERE property_id=?`,
              [body.updates[update], body.property_id],
              (err, res) => {
                // console.log(body.updates[update])
                if (err) {
                  return callback(err, null);
                }
              }
            );
          });
          return callback(null, { kind: "updated" });
        } else {
          return callback({ kind: "not owner" }, null);
        }
      }
    );
  }

  static sold(body, callback) {
    db.query(
      "SELECT * FROM properties WHERE (owner_id=? AND property_id=?)",
      [body.user_id, body.property_id],
      (error, response) => {
        if (error) {
          return callback(error, null);
        }
        if (response.length) {
          db.query(
            "UPDATE properties SET status=? WHERE property_id=?",
            [body.status, body.property_id],
            (err, res) => {
              if (err) {
                return callback(err, null);
              }
              if (res.affectedRows >= 1) {
                return callback(null, { kind: "updated" });
              } else {
                return callback({ kind: "not found" }, null);
              }
            }
          );
        } else {
          return callback({ kind: "not owner" }, null);
        }
      }
    );
  }
  static remove = (body, callback) => {
    db.query(
      "DELETE FROM properties WHERE (owner_id=? AND property_id=?)",
      [body.user_id, body.property_id],
      (error, res) => {
        if (error) {
          return callback(error, null);
        }
        if (res.affectedRows >= 1) {
          return callback(null, { kind: "deleted" });
        }
        return callback({ kind: "not owner" }, null);
      }
    );
  };

  static report(body, callback) {
    db.query(
      "INSERT INTO reports(property_id,reason,description,user_id) values(?,?,?,?)",
      [body.property_id, body.reason, body.description, body.user_id],
      (err, res) => {
        if (err) {
          // console.log("error ", err);
          callback(err, null);
        }else{
          callback(null, { kind: "reported" });
        }
      }
    );
  }
}

module.exports = Property;
