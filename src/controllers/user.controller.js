const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const {resetPasswordSchema, signupSchema, loginSchema} = require("../validators/userValidators")

exports.create = async (req, res) => {
  
  const {error, value} = signupSchema.validate(req.body)
if (error) {
  res.status(404).send({ status: "error", error: error.message });
  return;
}
  //create a new instance of a user
  const { email, first_name, last_name, password, phone, address, is_admin } =
    value;

  const hashPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));

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
  
  const {error, value} = loginSchema.validate(req.body)
  if (error) {
    res.status(404).send({ status: "error", error: error.message });
    return;
  }
  const { email, password } = value;
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
      return
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
exports.resetPassword = (req,res) => {
// const {currentPassword, newPassword}=req.body
const {error, value} = resetPasswordSchema.validate(req.body)
if(error){
  res.status(404).send({status: "error", error: error.message})
  return
}
User.resetPassword(value, (error, response)=>{
  if(error){
    if (error.kind === "not match") {
      res
        .status(404)
        .send({ status: "error", error: "invalid email or password" });
      
    }else{
      res.status(500).send({
        status: "error",
        error: error.message || "some error occured while resetting password",
      });
    }
    return
  }
  if(response?.kind === "success"){
    res.status(202).send({status: "successful", data: req.user})
    return
  }
  return
})

}


exports.logout = (req, res) => {
  User.signout(req.token, (error, result)=> {
    if(result?.kind === "success"){
      res.status(200).send({ status: "success", message: "User logged out successfully" });
    }else(      
      res.status(500).send({status:"error",error: "Authentication error"})
    )
  })
}

exports.logoutAll=(req, res)=> {
  User.signoutAll(req.user.id, (err,result)=> {
    // console.log(result)
    if(result.kind === "success"){
      res.status(200).send({"status": "success", "message": "User logged out from all devices successfully"})
    }else{
      res.status(500).send({ status: "error", Error: "Authentication error" });
    }
  })
}
