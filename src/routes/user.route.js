const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth")

module.exports = (app) => {
  router.post("/auth/signup", userController.create);
  router.post("/auth/login", userController.login);
  router.post("/auth/logout",auth, userController.logout);
  router.post("/auth/logoutAll", auth, userController.logoutAll);

  app.use("/v1", router);
};
