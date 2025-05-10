import express from "express";

import * as controllers from "../controllers/usersControllers.js";
import { validateToken } from "../server.js";

const router = express.Router();

//LIST USERS
router.get("/users", validateToken, controllers.getUsers);
//INSERT USER
router.post("/insertUser/:isAdmin", controllers.insertNewUser);

export default router;
