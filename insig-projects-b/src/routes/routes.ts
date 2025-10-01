import { Router } from "express";
import userRoutes from "../user/user.controller";
import projectRoutes from "../project/project.controller";
import pproductRoutes from "../product/product.controller";

const router = Router();

router.use("/users", userRoutes);
router.use("/projects", projectRoutes); 
router.use("/products", pproductRoutes); 

export default router;