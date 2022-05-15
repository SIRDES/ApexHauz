const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
// const genToken = require("./src/middleware/generateToken")
const userRouter = require("./src/routes/user.route");
const propertyRouter = require("./src/routes/property.route");
const app = express();


// app.post("/upload",upload.array("upload"),(req,res) => {
// res.send()
// })

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use("/api/v1/users", router)
userRouter(app);
propertyRouter(app);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
