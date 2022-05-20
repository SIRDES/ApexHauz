const router = require("express").Router();
const property = require("../controllers/property.controller");
const auth = require("../middleware/auth");
const multer = require("../utils/multer");

module.exports = (app) => {
  router.post("/", auth, property.create);
  router.post(
    "/:id/upload",
    auth,
    multer.array("images"),
    property.uploadImages
  );
  router.patch("/:id", auth, property.update);
  router.patch("/:id/sold", auth, property.status);
  router.post("/:id/report", auth, property.report);
  router.delete("/:id", auth, property.delete);
  router.get("/", property.getAll);
  router.get("/search", property.search);
  router.get("/:id", property.getOne);

  app.use("/v1/property", router);

  /**
   * @swagger
   * components:
   *  schemas:
   *   Properties:
   *    type: object
   *    required:
   *     - id:
   *     - price
   *     - address
   *    properties:
   *     id:
   *      type: integer
   *      description: The id of the property
   *     owner_id:
   *      type: integer
   *      description: The id of the owner of the property
   *     price:
   *      type: float
   *      description: The price of the property
   *     status:
   *      type: sting
   *      description: It indicates if the property is available or it has being sold
   *     type:
   *      type: string
   *      description: The type of property
   *     state:
   *      type: string
   *      description: The state in which the property is located
   *     city:
   *      type: string
   *      description: The city in which the property is located
   *     address:
   *      type: string
   *      description: The physical address of the property
   *     images_url:
   *      type: array
   *      description: The links to the pictures of the property
   *    example:
   *     id: 1
   *     owner_id: 4
   *     price: 125.99
   *     status: available
   *     type: "4-bedroom"
   *     state: Ashanti
   *     city: Kumasi
   *     address: ks 345
   *     images_url: []
   *     posted_on: "2022-05-17T11:44:33.416Z"
   *  responses:
   *   serverError:
   *    description: Some error occurred
   */

  /**
   * @swagger
   * tags:
   *  name: Properties
   *  description: The properties advertized on the site
   */

  /**
   * @swagger
   * /v1/property:
   *  get:
   *   summary: returns lists of all properties
   *   tags: [Properties]
   *   responses:
   *    201:
   *     description: ok
   *     content:
   *      application/json:
   *       schema:
   *        type: array
   *        items:
   *         $ref: "#/components/schemas/Properties"
   *    400:
   *     description: bad request
   *    500:
   *     $ref: "#/components/responses/serverError"
   */

  /**
   * @swagger
   * /v1/property/{id}:
   *  get:
   *   summary: returns lists of all properties
   *   tags: [Properties]
   *   parameters:
   *     - in: path
   *       name: id
   *       schema:
   *        type: integer
   *        required: true
   *        description: The id of the property
   *   responses:
   *    200:
   *     description: ok
   *     content:
   *      application/json:
   *       schema:
   *        type: array
   *        items:
   *         $ref: "#/components/schemas/Properties"
   *    404:
   *     description:  No property found
   *    500:
   *     $ref: "#/components/responses/serverError"
   */

  /**
   * @swagger
   * /v1/property/search:
   *  get:
   *   summary: returns lists of all properties
   *   tags: [Properties]
   *   parameters:
   *     - in: query
   *       name: type
   *       schema:
   *        type: string
   *        required: true
   *        description: The id of the property
   *   responses:
   *    200:
   *     description: ok
   *     content:
   *      application/json:
   *       schema:
   *        type: array
   *        items:
   *         $ref: "#/components/schemas/Properties"
   *    404:
   *     description:  No property found
   *    500:
   *     $ref: "#/components/responses/serverError"
   */

  /**
   * @swagger
   * /v1/property:
   *   post:
   *    summary: add a new property
   *    security:
   *     - bearerAuth: []
   *    tags: [Properties]
   *    requestBody:
   *     required: true
   *     content:
   *      application/json:
   *       schema:
   *        type: object
   *        example:
   *          status: available
   *          price: 123.56
   *          state: Ashanti
   *          city: Kumasi
   *          address: KS 129
   *          type: 4-bedroom
   *    responses:
   *     201:
   *      description: created
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/Properties"
   *     401:
   *      description: Unauthorized
   *     500:
   *      $ref: "#/components/responses/serverError"
   */

  /**
   * @swagger
   * /v1/property/{id}:
   *  delete:
   *   summary: removes a property the database
   *   tags: [Properties]
   *   security:
   *    - bearerAuth: []
   *   parameters:
   *    - in: path
   *      name: id
   *      schema:
   *      type: integer
   *      required: true
   *      description: The id of the property
   *   responses:
   *    201:
   *      description: deleted
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/Properties"
   *    401:
   *     description: Unauthorized
   *    500:
   *     $ref: "#/components/responses/serverError"
   */

  /**
   * @swagger
   * /v1/property/{id}/report:
   *  post:
   *   summary: reports a property as fraudulent
   *   tags: [Properties]
   *   security:
   *    - bearerAuth: []
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      type: integer
   *      description: The id of the property
   *   responses:
   *    200:
   *     description: reported
   *     content:
   *      application/json:
   *       schema:
   *        type: array
   *        items:
   *        $ref: "#/components/schemas/Properties"
   *    400:
   *     description: Bad request
   *    500:
   *     $ref: "#/components/responses/serverError"
   */

  /**
   * @swagger
   * /v1/property/{id}:
   *  patch:
   *   summary: updates the details of the property
   *   tags: [Properties]
   *   security:
   *    - bearerAuth: []
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      type: integer
   *      description: The id of the property
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       type: object
   *       example:
   *        status: available
   *        price: 123.56
   *        state: Ashanti
   *        city: Kumasi
   *        address: KS 129
   *        type: 4-bedroom
   *   responses:
   *     201:
   *      description: updated
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *         $ref: "#/components/schemas/Properties"
   *     400:
   *      description: Bad request
   *     401:
   *      description: Unauthorized
   *     500:
   *      $ref: "#/components/responses/serverError"
   */

  /**
   * @swagger
   * /v1/property/{id}/sold:
   *  patch:
   *   summary: marks a property as sold
   *   tags: [Properties]
   *   security:
   *    - bearerAuth: []
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      type: integer
   *      description: The id of the property
   *   responses:
   *     201:
   *      description: updated
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *         $ref: "#/components/schemas/Properties"
   *     400:
   *      description: Bad request
   *     401:
   *      description: Unauthorized
   *     500:
   *      $ref: "#/components/responses/serverError"
   */

  /**
   * @swagger
   * /v1/property/{id}/upload:
   *  post:
   *   summary: uploads images of a property
   *   tags: [Properties]
   *   security:
   *    - bearerAuth: []
   *   comsumes:
   *    - multipart/form-data
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      schema:
   *       type: integer
   *       description: The id of the property
   *   requestBody:
   *    content:
   *     multipart/form-data:
   *      schema: 
   *       type: object
   *       properties:
   *        files:
   *         type: array
   *         items:
   *          type: file
   *   responses:
   *    201:
   *     description: updated
   *     content:
   *      application/json:
   *       schema:
   *        type: array
   *        items:
   *        $ref: "#/components/schemas/Properties"
   *    400:
   *     description: Bad request
   *    401:
   *     description: Unauthorized
   *    500:
   *     $ref: "#/components/responses/serverError"
   */
};
