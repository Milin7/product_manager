import { body, param } from "express-validator";

export const createProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Product name cannot exceed 100 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
];

export const updateProductValidator = [
  param("id").isInt().withMessage("Invalid product ID"),

  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Product name cannot exceed 100 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),

  body("availability")
    .isBoolean()
    .withMessage("Availability must be a boolean"),
];

export const productIdValidator = [
  param("id").isInt().withMessage("Invalid product ID"),
];
