const Property = require("../models/property.model");
const imageUpload = require("../utils/imageUpload");

exports.create = async (req, res, next) => {
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
  const { status, price, state, city, address, type } = req.body;

  const property = new Property(
    req.user.id,
    status,
    price,
    state,
    city,
    address,
    type
  );
  next()
  //save a property
  Property.create(property, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        error: err.message || "some error occured while creating user",
      });
    } else {
      {
        data.status === undefined
          ? (data["status"] = "available")
          : data.status === ""
          ? (data.status = "available")
          : "";
      }
      // console.log(data);
      req.property = data;
      res.status(201).send({ "status": "success", "data": { ...data } });
    }
    // console.log(req.property);
    next();
  });
};

exports.uploadImages = async (req, res) => {
  // console.log("multer error")
  const files = req.files;
 const {id} = req.params
  imageUpload({ property_id :id, files }, (err, urls) => {
    if (err) {
      res.status(500).send({
        status: "error",
        error: err.message || "some error occured while adding images",
      });
    } else {
      res.status(201).send({
        status: "success",
        data: { img_urls: { ...urls } },
      });
    }
  });
};

// Getting all properties from the database
exports.getAll = async (req, res) => {
  Property.findAll(async (err, data) => {
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          status: "error",
          error: "Not properties found",
        });
      } else {
        res.status(500).send({
          status: "error",
          error:
            err.message || "some error occured while retrieving properties",
        });
      }
    }
    // Found property
    res.status(200).send({ status: "success", data: [...data] });
  });
};

// Reading a property by id
exports.getOne = (req, res) => {
  const { id } = req.params;
  Property.findOne(id, (error, data) => {
    if (error) {
      if (error.kind === "not found") {
        res.status(404).send({
          status: "error",
          message: `property with id ${id} was not found`,
        });
      } else {
        res.status(500).send({
          status: "error",
          message:
            error.message ||
            `some error occured while retrieving property with id ${id}`,
        });
      }
    } else {
      res.status(200).send({ status: "success", data });
    }
  });
};
