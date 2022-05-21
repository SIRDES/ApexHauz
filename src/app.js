const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const propertyRouter = require("./routes/property.route");
const swagger = require("./documentation/swagger");
// require("dotenv")
const app = express();
// console.log(process.env)
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

userRouter(app);
propertyRouter(app);
swagger(app);

app.use((error, req, res, next) => {
  if (error) {
    res
      .status(error.statusCode || 500)
      .send({ status: "error", error: error.message });
  }
  next();
});
module.exports = app