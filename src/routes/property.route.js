const router = require("express").Router();
const property = require("../controllers/property.controller");
const auth = require("../middleware/auth");
const multer = require("../utils/multer");

module.exports = (app) => {
  router.post("/", auth, property.create);
  router.post("/:id/upload", auth, multer.array("images"), property.uploadImages, (error, req, res,next)=> {
    res.send({"error": error.message})
  });
  router.patch("/:id", auth, property.update);
  router.patch("/:id/sold",auth,property.status);
  router.delete("/:id", auth, property.delete);
  router.get("/", property.getAll);
  router.get("/search", property.search);
  router.get("/:id", property.getOne);

  app.use("/v1/property", router);
};
