const db = require("../config/db.config");
const cloudinary = require("cloudinary").v2;
const fs =require("fs")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (data, result) => {
// data =  {property_id : req.property.property_id, files},
try {
  const urls =[] 
  for(const file of data.files){
      const res = await cloudinary.uploader.upload(file.path);
      db.query(
        "INSERT INTO images (property_id, image_url) values(?,?)",
        [data.property_id, res.url],
        (err, response) => {});
      urls.push(res.url)
      // fs.linkSync(file)
    }
    result(null, urls)
    
  } catch (error) {
    return result(error, null);
  }
};

module.exports = uploadImage;
