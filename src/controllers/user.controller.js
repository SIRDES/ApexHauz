const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
  }
  //create a new instance of a user
  const {
    email,
    first_name,
    last_name,
    password,
    phone,
    address,
    is_admin,
  } = req.body;
  const hashPassword = await bcrypt.hash(password, 8);

  const user = new User(
    email,
    first_name,
    last_name,
    hashPassword,
    phone,
    address,
    is_admin
  );
    user.email = user.email.toLowerCase()
  //save a user
  User.create(user, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({
          status: "error",
          error: err.message || "some error occured while creating user",
        });
    } else {
      delete data.password;
      res.status(201).send({ status: "success", data: { ...data } });
    }
  });
};
