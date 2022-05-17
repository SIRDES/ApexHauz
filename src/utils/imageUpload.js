const db = require("../config/db.config");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = require("../utils/secrets");
const res = require("express/lib/response");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadImage = async (data, callback) => {
  // data =  {property_id : req.property.property_id, files},
  try {
    const urls = [];
    for (const file of data.files) {
      const res = await cloudinary.uploader.upload(file.path);
      urls.push(res.url);
      // fs.linkSync(file)
    }
    const imgs = JSON.stringify({...urls})
    db.query(
      "UPDATE properties SET images_url=? WHERE property_id=?",
      [imgs, data.property_id],
      (err, response) => {
        if (err) {
          return callback(err, null);
        }
        // console.log(urls);
        callback(null, urls);
        return;
      }
    );
  } catch (error) {
    return callback(error, null);
  }
};

module.exports = uploadImage;
