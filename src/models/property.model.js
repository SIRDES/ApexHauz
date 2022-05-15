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
  static create(newProperty, result) {
    db.query(
      "INSERT INTO Property(owner_id,status,price,state,city,address, type) values(?,?,?,?,?,?,?)",
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
          result(err, null);
          return;
        }
        // console.log("Created user: ", { ...newProperty });
        result(null, { id: res.insertId, ...newProperty });
      }
    );
  }
  static findAll(result) {
    db.query("SELECT * FROM Property", (err, res) => {
      if (err) {
        return result(err, null);
      }
      if (res.length) {
        return result(null, res);
      }

      result({ kind: "not found" }, null);
    });
  }
  static findOne(property_id, results) {
    db.query(
      "SELECT * FROM Property WHERE property_id=?",
      [property_id],
      (err, res) => {
        if (err) {
          return results(err, null);
        }
        if (res.length) {
          return results(null, res[0]);
        }
        results({ kind: "not found" }, null);
      }
    );
  }

  // This method updates the details of a property in the database
  static update(body, callback) {
    db.query(
      "SELECT * FROM Property WHERE (owner_id=? AND property_id=?)",
      [body.user_id, body.property_id],
      (error, response) => {
        if (error) {
          return callback(error, null);
        }
        if (response.length) {
          // body.updates.forEach((update)=> )
          const updateFields = Object.keys(body.updates)
          updateFields.forEach((update) => {
            db.query(
              `UPDATE Property SET ${update}=? WHERE property_id=?`,
              [body.updates[update], body.property_id],
              (err, res) => {
                // console.log(body.updates[update])
                if(err){
                  return callback(err,null)
                }
              }
            );
          })
          return callback(null, {kind: "updated"})
          
        } else {
          return callback({ kind: "not owner" }, null);
        }
      }
    );
  }

  static sold(body, callback) {
    db.query(
      "SELECT * FROM Property WHERE (owner_id=? AND property_id=?)",
      [body.user_id, body.property_id],
      (error, response) => {
        if (error) {
          return callback(error, null);
        }
        if (response.length) {
          db.query(
            "UPDATE Property SET status=? WHERE property_id=?",
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
      "DELETE FROM Property WHERE (owner_id=? AND property_id=?)",
      [body.user_id, body.property_id],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        if (results.affectedRows >= 1) {
          return callback(null, { kind: "deleted" });
        }
        return callback({ kind: "not owner" }, null);
      }
    );
  };
}

module.exports = Property;
