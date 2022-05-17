const express = require("express");
const router = express.Router();
const cors = require("cors");
// require("dotenv").config();
const fileupload = require("express-fileupload")
const userRouter = require("./src/routes/user.route");
const propertyRouter = require("./src/routes/property.route");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use(fileupload({
//   useTempFiles: true
// }))
// app.use("/api/v1/users", router)
userRouter(app);
propertyRouter(app);


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
