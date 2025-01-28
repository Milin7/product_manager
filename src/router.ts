import { Router } from "express";
import { createProduct, getProducts } from "./handlers/product";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

//Routing
router.get("/", getProducts);

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

router.put("/", (req, res) => {
  res.json("Desde put");
});

router.patch("/", (req, res) => {
  res.json("Desde patch");
});

router.delete("/", (req, res) => {
  res.json("Desde delete");
});
export default router;
