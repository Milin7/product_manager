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

//Routing
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputErrors,
  getProductById
);

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

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  param("id").isInt().withMessage("ID not valid"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputErrors,
  deleteProduct
);
export default router;
