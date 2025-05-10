import express from "express";
import * as controllers from "../controllers/loginControllers.js";

const router = express.Router();

//LOGIN ROUTE
router.get("/login", controllers.userLogin);

export default router;
