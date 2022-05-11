const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.create = async (req, res) => {
  // console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  if (req.body.email === "" || req.body.password === "") {
    res
      .status(400)
      .send({ status: "error", error: "Email or password cannot be empty" });
    return;
  }

  //create a new instance of a user
  const { email, first_name, last_name, password, phone, address, is_admin } =
    req.body;

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
  user.email = user.email.toLowerCase();
  //save a user
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        "status": "error",
        "error": err.message || "some error occured while creating user",
      });
    } else {
      delete data.password;
      res.status(201).send({ "status": "success", "data": { ...data } });
    }
  });
};

// Getting a user from the database
exports.login = async (req, res) => {
  // Checking if req.body is empty
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ status: "error", error: "content cannot be empty" });
    return;
  }
  // checking if either email or password is empty or undefined
  if (
    req.body.email === "" ||
    req.body.email === undefined ||
    req.body.password === "" ||
    req.body.password === undefined
  ) {
    res
      .status(400)
      .send({
        status: "error",
        error: "Email or password cannot be empty or null",
      });
    return;
  }

  const { email, password } = req.body;
  // Retrieving user details from the database
  User.login(email, async (err, data) => {
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          status: "error",
          error: `Not found user with email ${email}`,
        });
      } else {
        res.status(500).send({
          status: "error",
          error: err.message || "some error occured while signing in user",
        });
      }
    }
    // Checking if passwords match
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      res
        .status(404)
        .send({ status: "error", error: "Invalid email or password" });
      return;
    }
    delete data.password;
    res.status(200).send({ status: "success", data: { ...data } });
  });
};
