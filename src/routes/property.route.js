const router = require("express").Router();
const property = require("../controllers/property.controller");
const auth = require("../middleware/auth")
module.exports = (app) => {
  router.post("/", auth, property.create);
  router.get("/", property.getAll);

  app.use("/api/v1/property", router);
};
