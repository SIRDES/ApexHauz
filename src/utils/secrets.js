require("dotenv").config();
// console.log(process.env)
const {
  BCRYPT_SALT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
} = process.env;

const requiredCredentials = [
  BCRYPT_SALT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
];

// for (const credential of requiredCredentials) {
//   if (process.env[credential] === undefined) {
//     console.log(`Missing required crendential: ${credential}`);
//     process.exit(1);
//   }
// }

module.exports = {
  BCRYPT_SALT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
};
