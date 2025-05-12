import express from "express";

import * as controllers from "../controllers/usersControllers.js";
import { validateToken } from "../server.js";

const router = express.Router();

//LIST USERS
router.get("/users", validateToken, controllers.getUsers);
//INSERT USER
router.post("/insertUser/:isAdmin", controllers.insertNewUser);

//NAME AND isADMIM by ID(não finalizado ainda)
router.get("/userId/:userId",(req, res)=>{
  const userId = req.params.userId;
  return res.json({
    user:"kaio",
    admim: "true",
    userId: userId
  })
})

export default router;
