const Property = require("../models/property.model");

exports.create = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  if (
    req.body.price === "" ||
    req.body.price === undefined ||
    req.body.address === "" ||
    req.body.address === undefined
  ) {
    res
      .status(400)
      .send({ status: "error", error: "price or address cannot be empty" });
    return;
  }
  //create a new instance of a property
  const {status, price, state, city, address, type } = req.body;

  const property = new Property(
    req.user.id,
    status,
    price,
    state,
    city,
    address,
    type
  );
  //save a property
  Property.create(property, (err, data) => {
    if (err) {
      res.status(500).send({
        "status": "error",
        "error": err.message || "some error occured while creating user",
      });
    } else {
      {data.status === undefined ? data["status"]="available" : data.status=== "" ? data.status = "available": "" }

      res.status(201).send({ "status": "success", "data": { ...data } });
    }
  });
};

// Getting all properties from the database
exports.getAll = async (req, res) => {

  Property.findAll(async (err, data) => {
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          "status": "error",
          "error": "Not properties found",
        });
      } else {
        res.status(500).send({
          "status": "error",
          "error": err.message || "some error occured while retrieving properties",
        });
      }
    }
    // Found property
    res.status(200).send({ "status": "success", "data": [...data] });
  });
};

// Reading a property by id
exports.getOne = (req, res)=>{
// if (Object.keys(req.params).length === 0) {
//   res.status(400).send({ status: "error",message: "Content cannot be empty" });
//   return;
// }
// if(req.params.id === "" || req.params.id === undefined){
//   res.status(404).send({status: "error", message: "Property id cannot be empty"})
//   return
// }
const {id} = req.params;
  Property.findOne(id, (error, data)=> {
    if(error){
      if(error.kind === "not found"){
        res.status(404).send({"status": "error",
            "message": `property with id ${id} was not found`,
          });
      }else{
        res.status(500).send({
          "status": "error",
          "message": error.message || `some error occured while retrieving property with id ${id}`,
        });
      }
    }else{
        res.status(200).send({ status: "success", data });
    }
  })
}
