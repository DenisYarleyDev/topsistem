import express from "express";
import { ValidateToken } from "../middleware/auth/validadeToken.js";
import * as Customer from "../controllers/customerControllers.js";
const router = express.Router();

//INSERIR LOG DE ALGUMA ALTERACAO
router.post("/create-customer", ValidateToken, Customer.create );

  
export default router;
 