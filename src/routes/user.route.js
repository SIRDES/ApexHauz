const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth")

module.exports = (app) => {
  router.post("/auth/signup", userController.create);
  router.post("/auth/login", userController.login);
  router.post("/auth/reset-password", auth, userController.resetPassword);
  router.post("/auth/logout", auth, userController.logout);
  router.post("/auth/logoutAll", auth, userController.logoutAll);

  app.use("/v1", router);

  /**
   * @swagger
   * components:
   *   schemas:
   *     Users:
   *       type: object
   *       required:
   *         - id
   *         - email
   *         - password
   *       properties:
   *         id:
   *           type: integer
   *           description: The id of the user
   *         email:
   *           type: string
   *           description: The email for the user
   *         password:
   *           type: string
   *           description: The password for the user
   *         first_name:
   *           type: string
   *           description: The first name of the user
   *         last_name:
   *           type: string
   *           description: The last name of the user
   *         phone:
   *           type: string
   *           description: The telephone number of the user
   *         address:
   *            type: string
   *            description: The address of the user
   *         is_admin:
   *            type: boolean
   *            description: True, if the user is an admin
   *       example:
   *         id: 1
   *         email: johndoe@gmail.com
   *         first_name: John
   *         last_name: Doe
   *         phone: "+23324223322"
   *         address: ks 20
   *         is_admin: true
   *         created_on: "2022-05-17T11:44:33.416Z"
   *   responses:
   *    Unauthorized:
   *      description: Invalid email or password
   *    ServerError:
   *      description: some error occurred. Try again
   *
   */

  /**
   * @swagger
   * tags:
   *  name: Users
   *  description: The users of the site
   */

  /**
   * @swagger
   * /v1/auth/signup:
   *   post:
   *    summary: This creates a new user
   *    tags: [Users]
   *    requestBody:
   *     required: true
   *     content:
   *      application/json:
   *       schema:
   *        type: object
   *        example:
   *          email: johndoe@gmail.com
   *          first_name: john
   *          last_name: Doe
   *          password: "jd477720"
   *          phone: "+233277477720"
   *          address: kumasi
   *          is_admin: true
   *    responses:
   *     201:
   *      description: created
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/Users"
   *     500:
   *      $ref: "#/components/responses/ServerError"
   */

  /**
   * @swagger
   * /v1/auth/login:
   *   post:
   *    summary: login user
   *    tags: [Users]
   *    requestBody:
   *     required: true
   *     content:
   *      application/json:
   *       schema:
   *        type: object
   *        example:
   *          email: johndoe@gmail.com
   *          password: "jd477720"
   *    responses:
   *     202:
   *      description: logged in
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/Users"
   *     404:
   *      $ref: "#/components/responses/Unauthorized"
   *     500:
   *      $ref: "#/components/responses/ServerError"
   */

  /**
   * @swagger
   * /v1/auth/reset-password:
   *   post:
   *    summary: resets users password
   *    security:
   *     - bearerAuth: []
   *    tags: [Users]
   *    requestBody:
   *     required: true
   *     content:
   *      application/json:
   *       schema:
   *        type: object
   *        example:
   *          email: johndoe@gmail.com
   *          currentPassword: "jd477720"
   *          newPassword: "+po77477720"
   *    responses:
   *     202:
   *      description: password resetted
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/Users"
   *     404:
   *      $ref: "#/components/responses/Unauthorized"
   *     500:
   *       description: server error
   */

  /**
   * @swagger
   * /v1/auth/logout:
   *   post:
   *    summary: logout user from current device
   *    security:
   *     - bearerAuth: []
   *    tags: [Users]
   *    responses:
   *     200:
   *      description: logout successful
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/Users"
   *     500:
   *      $ref: "#/components/responses/ServerError"
   */

  /**
   * @swagger
   * /v1/auth/logoutAll:
   *   post:
   *    summary: Logout user from all login devices
   *    security:
   *     - bearerAuth: []
   *    tags: [Users]
   *    responses:
   *     200:
   *      description: logout from all devices
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/Users"
   *     500:
   *      $ref: "#/components/responses/ServerError"
   */
};
