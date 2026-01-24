import { Router } from "express";
import productRoutes from "./product.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/products", productRoutes);
router.use("/auth", authRoutes);

export default router;
