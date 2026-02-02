import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import {
  categoryAndUserIdSchema,
  userIdCategorySchema,
} from "../validators/category.validator";
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
 *        201:
 *          description: Category created successfully
 *        404:
 *          description: User not found
 *
 */
router.post(
  "/:userId",
  validate(userIdCategorySchema),
  CategoryController.createCategory,
);

/**
 * @swagger
 * /api/categories/{userId}:
 *   delete:
 *     summary: Deletes all categories of a current user
 *     tags:
 *       - Categories
 *     description: Returns all the objects that were deleted
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The userId that will delete all the categories
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "All categories for the user has been deleted"
 *       400:
 *         description: Bad request - Invalid userId
 *       404:
 *         description: Categories not found
 */
router.delete(
  "/:userId",
  validate(userIdCategorySchema),
  CategoryController.deleteAllCategories,
);

/**
 * @swagger
 * /api/categories/{userId}/{categoryId}:
 *   delete:
 *     summary: Deletes the category for the current user
 *     tags:
 *       - Categories
 *     description: Returns the category that was deleted
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The userId that will delete all the categories
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: categoryId
 *         description: The categoryId that will be deleted
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "The category specified for the user has been deleted"
 *       400:
 *         description: Bad request - Invalid userId
 *       404:
 *         description: Categories not found
 */
router.delete(
  "/:userId/:categoryId",
  validate(categoryAndUserIdSchema),
  CategoryController.deleteCategoryById,
);

export default router;
