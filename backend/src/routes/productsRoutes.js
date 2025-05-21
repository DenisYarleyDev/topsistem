import express from "express";
import { ValidateToken } from "../middleware/auth/validadeToken.js";
import * as controllers from "../controllers/productsControllers.js";
const router = express.Router();

//LIST PRODUCTS
router.get("/products", controllers.getAll );

 
export default router;
 