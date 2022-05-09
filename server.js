const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
require("./src/config/db.config");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
