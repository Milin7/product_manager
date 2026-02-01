import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { userIdCategorySchema } from "../validators/category.validator";
import { CategoryController } from "../controllers/Category.controller";

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *       Category:
 *            type: object
 *            properties:
 *                id:
 *                  type: integer
 *                  description: The category id
 *                  example: 1
 *                category:
 *                  type: string
 *                  description: The category name
 *                  example: "Personal expenses"
 *                user_id:
 *                  type: integer
 *                  description: The user id that's creating the category
 *                  example: 2
 *                description:
 *                  type: string
 *                  description: If you want to add a short description of the category.
 *                  example: "This category is for registering my personal expenses"
 *
 *
 */

/**
 *@swagger
 *  /api/categories/{userId}:
 *    get:
 *      summary: Get all categories based on user userId
 *      tags:
 *        - Categories
 *      description: Return all categories assigned by a user based on user userId
 *      parameters:
 *      - in: path
 *        name: userId
 *        description: The userId of the user that you're retrieving the categories from
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Category'
 *        404:
 *          description: Category not found
 *        400:
 *          description: Bad request, invalid userId
 */

router.get(
  "/:userId",
  validate(userIdCategorySchema),
  CategoryController.getCategoryByUser,
);

/**
 *@swagger
 *  /api/categories/{userId}:
 *    post:
 *      summary: Create a new category
 *      tags:
 *        - Categories
 *      description: Create a category for a specific user userId
 *      parameters:
 *        - in: path
 *          name: userId
 *          description: The userId of the user that is creating the category
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                category:
 *                  type: string
 *                  example: "Rent"
 *                description:
 *                  type: string
 *                  example: "This is the category for my rent due monthly"
 *      responses:
 *        200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 *        404:
 *          description: User doesn't exist in database
 *        400:
 *          description: Bad request, invalid userId
 */
router.post(
  "/:userId",
  validate(userIdCategorySchema),
  CategoryController.createCategory,
);

export default router;
