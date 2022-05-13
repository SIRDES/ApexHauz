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
  static findOne(property_id,results){
    db.query("SELECT * FROM Property WHERE property_id=?",[property_id], (err,res)=> {
      if(err){
        return results(err,null)
      }
      if(res.length){
        return results(null, res[0])
      }
      results({kind: "not found"},null)
    })
  }
}

module.exports = Property;
