const router = require("express").Router();
const property = require("../controllers/property.controller");

module.exports = (app) => {
  router.post("/", property.create);
  router.get("/", property.getAll);

  app.use("/api/v1/property", router);
};
