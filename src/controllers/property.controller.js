const Property = require("../models/property.model");
const imageUpload = require("../utils/imageUpload");
const {newPropertySchema,statusSchema, updateSchema, reportSchema} = require("../validators/propertyValidators");

exports.create = async (req, res, next) => {
  
  const {error,value} =newPropertySchema.validate(req.body)
if (error) {
  res.status(400).send({
    status: "error",
    error: error.message.replace("/[^a-zA-Z0-9 ]/g", ""),
  });
  return;
}
  //create a new instance of a property
  const { status, price, state, city, address, type } = value;

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
        status: "error",
        error: err.message || "some error occured while creating user",
      });
    } else {
      req.property = data;
      res.status(201).send({ status: "success", data: { ...data } });
    }
    next();
  });
};

exports.uploadImages = async (req, res) => {
  // console.log("multer error")
  const { id } = req.params;
  const files = req.files;
  // console.log(files);

  imageUpload({ property_id: id, files }, (err, urls) => {
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
          error: "No properties found",
        });
      } else {
        res.status(500).send({
          status: "error",
          error:
            err.message || "some error occured while retrieving properties",
        });
      }
      return
    }
    // Found property
    res.status(200).send({ status: "success", data: [...data] });
  });
};

//search for property according their type
exports.search = async (req, res) => {
  const type = req.query.type
  Property.findByType(type,async (err, data) => {
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          status: "error",
          error: "No properties found",
        });
      } else {
        res.status(500).send({
          status: "error",
          error:
            err.message || "some error occured while retrieving properties",
        });
      }
      return
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
// This module updates the details fo a property advert
exports.update = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  
  const updates = req.body;
  const { error, value } = updateSchema.validate(updates);
  if (error) {
    res.status(400).send({
      status: "error",
      error: error.message.replace("/[^a-zA-Z0-9 ]/g", ""),
    });
    return;
  }
  Property.update({ property_id: id,user_id, updates: value }, (error, response) => {
    if (error) {
      if (error.kind === "not owner") {
        res.status(401).send({
          status: "error",
          error: "User cannot update this property",
        });
      } else {
        res.status(500).send({
          status: "error",
          error:
            error.message ||
            `some error occured while updating property with id ${id}`,
        });
      }
    } else if (response.kind === "updated") {
      res.status(200).send({
        status: "success",
        message: "Property details updated successfully",
      });
    } else {
      res.status(500).send({
        status: "error",
        error:
          error.message ||
          `some error occured while updating property with id ${id}`,
      });
    }
  });
};

// This module marks a property sold or available
exports.status = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const { status } = req.body;
  const { error, value } = statusSchema.validate({ status });
  if (error) {
    res
      .status(404)
      .send({
        status: "error",
        error: error.message.replace("/[^a-zA-Z0-9 ]/g", ""),
      });
    return;
  }
  Property.sold({ property_id: id, status, user_id }, (error, response) => {
    if (error) {
      if (error.kind === "not found") {
        res.status(404).send({
          status: "error",
          error: `Could not find property with id ${id}`,
        });
      } else if (error.kind === "not owner") {
        res.status(401).send({
          status: "error",
          error: "User cannot update this property",
        });
      } else {
        res.status(500).send({
          status: "error",
          error:
            error.message ||
            `some error occured while updating property with id ${id}`,
        });
      }
    } else if (response.kind === "updated") {
      res.status(200).send({
        status: "success",
        message: "Property status updated successfully",
      });
    } else {
      res.status(500).send({
        status: "error",
        error:
          error.message ||
          `some error occured while updating property with id ${id}`,
      });
    }
  });
};

exports.report = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  // const { reason } = req.body;
  const { error, value } = reportSchema.validate(req.body);
  if (error) {
    res.status(404).send({
      status: "error",
      error: error.message.replace("/[^a-zA-Z0-9 ]/g", ""),
    });
    return;
  }
  Property.report({ property_id: id, user_id, ...value }, (error, response) => {
    // console.log(response)
    if(response?.kind === "reported"){
      res.status(200).send({status: "success", message: "Report submitted successfully!"})
    }else{
      res.status(500).send({status: "error", error: error.message || `An error occured while reporting property with id ${id}`})
    }
  })
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  Property.remove({ property_id: id, user_id }, (error, results) => {
    if (error) {
      if (error.kind === "not owner") {
        res
          .status(401)
          .send({
            status: "error",
            error:
              "Sorry! You can only delete a property that was posted by you",
          });
      } else {
        res
          .status(500)
          .send({
            status: "error",
            error:
              error.message ||
              `some error occured while deleting property with id ${id}`,
          });
      }
    } else if (results.kind === "deleted") {
      res.status(200).send({
        status: "success",
        message: "Property status deleted successfully",
      });
    }else{
      res.status(500).send({
        status: "error",
        error:
          error.message ||
          `some error occured while deleting property with id ${id}`,
      });
    }
  });
};
