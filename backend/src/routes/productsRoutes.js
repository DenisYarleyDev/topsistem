import express from "express";
import { ValidateToken } from "../middleware/auth/validadeToken.js";
import * as controllers from "../controllers/productsControllers.js";
import multer from "multer"; 
const upload = multer({ dest: "public/imgs/products/" });
const router = express.Router();

//LIST PRODUCTS
router.get("/products", ValidateToken, controllers.getAll );
router.get("/products-categories", ValidateToken,  controllers.getAllCategories );
router.post("/create-product", ValidateToken, upload.single("image") , controllers.createProduct );
export default router;