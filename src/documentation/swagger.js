const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
const {PORT} = require("../utils/secrets")
const port = PORT || 3000

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ApexHauz API",
      version: "1.0.0",
      description: "This is the api for ApexHauz application",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

const swagger = (app) => {
  app.use("/v1/docs", swaggerUI.serve, swaggerUI.setup(specs))
}

module.exports= swagger
