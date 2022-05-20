const express = require("express");
const router = express.Router();
const cors = require("cors");
const userRouter = require("./src/routes/user.route");
const propertyRouter = require("./src/routes/property.route");
const swagger = require("./src/documentation/swagger")
const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

userRouter(app);
propertyRouter(app)
swagger(app)

app.use((error, req, res, next) => {
  if (error) {
    res
      .status(error.statusCode || 500)
      .send({ status: "error", error: error.message });
  }
  next();
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
