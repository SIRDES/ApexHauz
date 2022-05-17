const db = require("../../config/db.config");

const createTableImages = `CREATE TABLE IF NOT EXISTS images (
  image_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  property_id INT UNSIGNED NOT NULL,
  image_url varchar(255),
  created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE
  )`
  const imagesTable = () => {
  console.log("creating images table...");

  db.query(createTableImages, (error, data) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("Images table created!")
    process.exit(0);
  });
}
imagesTable();
