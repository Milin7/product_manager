import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvailability,
  deleteProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *       Product:
 *            type: object
 *            properties:
 *                id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *                name:
 *                  type: string
 *                  description: The Product name
 *                  example: Black mechanical keyboard
 *                price:
 *                  type: number
 *                  description: The Product price
 *                  example: 300
 *                availability:
 *                  type: boolean
 *                  description: The Product availability
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products.
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */

/**
 *@swagger
 *  /api/products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      tags:
 *        - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Product'
 *        404:
 *          description: Product not found
 *        400:
 *          description: Bad request, invalid ID
 */

//Routing
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Black mechanical keyboard"
 *              price:
 *                type: number
 *                example: 300
 *    responses:
 *      200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - invalid input data
 */

router.post(
  "/",
  body("name").notEmpty().withMessage("Cant be empty"),
  body("price")
    .isNumeric()
    .withMessage("Not a valid format")
    .notEmpty()
    .withMessage("Cant be empty")
    .custom(value => value > 0)
    .withMessage("cant be lower than 0"),
  handleInputErrors,
  createProduct
);
/**
 *@swagger
 *
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: "Black mechanical keyboard"
 *                price:
 *                  type: number
 *                  example: 300
 *                availability:
 *                  type: boolean
 *                  example: true
 *    responses:
 *      200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID or Invalid input data
 *      404:
 *        description: Product not found
 */
router.put(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  body("name").notEmpty().withMessage("Cant be empty"),
  body("price")
    .isNumeric()
    .withMessage("Not a valid format")
    .notEmpty()
    .withMessage("Cant be empty")
    .custom(value => value > 0)
    .withMessage("cant be lower than 0"),
  body("availability")
    .isBoolean()
    .withMessage("Availability can only be set to true or false"),
  handleInputErrors,
  updateProduct
);
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *    summary: Update product availability
 *    tags:
 *        - Products
 *    description: Returns the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  param("id").isInt().withMessage("ID not valid"),
  handleInputErrors,
  updateAvailability
);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *    summary: Deletes a product by a given ID
 *    tags:
 *        - Products
 *    description: Returns the confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                  type: string
 *                  value: "The product has been deleted"
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputErrors,
  deleteProduct
);
export default router;
