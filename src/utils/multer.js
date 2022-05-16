const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./images/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

const upload = multer({
  dest: "./images",
  // storage: storage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return cb(new Error("File must be an image"));
    }
    cb(undefined, true);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
module.exports = upload;
