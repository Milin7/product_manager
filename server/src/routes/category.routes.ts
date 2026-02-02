import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import {
  categoryAndUserIdSchema,
  updateCategorySchema,
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
 *                categoryName:
 *                  type: string
 *                  description: The category name
 *                  example: "Personal expenses"
 *                userId:
 *                  type: integer
 *                  description: The user id that's creating the category
 *                  example: 2
 *                categoryDescription:
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
 * @swagger
 * /api/categories/{userId}/{categoryId}:
 *   get:
 *     summary: Get a category by id
 *     tags:
 *       - Categories
 *     description: Return the category specified by userId and categoryId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The userId of the user
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The categoryId to retrieve
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       400:
 *         description: Bad request, invalid userId or categoryId
 */
router.get(
  "/:userId/:categoryId",
  validate(categoryAndUserIdSchema),
  CategoryController.getCategoryById,
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
 *                name:
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
 * /api/categories/{userId}/{categoryId}:
 *   patch:
 *     summary: Update a category for a user
 *     tags:
 *       - Categories
 *     description: Partially updates the category and/or description for the specified category belonging to the user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The category ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated category"
 *               description:
 *                 type: string
 *                 example: "This is the updated description"
 *             minProperties: 1
 *             description: At least one of category or description must be provided.
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request - Invalid userId, categoryId, or body
 *       404:
 *         description: Category not found
 */
router.patch(
  "/:userId/:categoryId",
  validate(updateCategorySchema),
  CategoryController.updateCategory,
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
