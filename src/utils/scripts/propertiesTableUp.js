const db = require("../../config/db.config");

const createTableProperties = `CREATE TABLE IF NOT EXISTS properties (
  property_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  owner_id INT UNSIGNED NOT NULL,
  status VARCHAR(10) DEFAULT "available",
  price float NOT NULL,
  state varchar(20),
  city varchar(30),
  address varchar(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  is_admin Boolean,
  images_url JSON,
  created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
  )`
  
  const propertiesTable= () => {
  console.log("creating properties table...");

  db.query(createTableProperties, (error, data) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("properties table created")
    process.exit(0);
  });
}

propertiesTable();
