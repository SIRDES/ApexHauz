const router = require("express").Router();
const userController = require("../controllers/user.controller");

module.exports = (app) => {
  router.post("/auth/signup", userController.create);
  router.post("/auth/login", userController.login);

  app.use("/api/v1/users", router);
};
