import { Router } from "express";
import productRoutes from "./product.routes";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";

const router = Router();

router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);

export default router;
