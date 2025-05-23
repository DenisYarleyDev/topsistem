import express from "express";

import * as controllers from "../controllers/usersControllers.js";
import { ValidateToken } from "../middleware/auth/validadeToken.js";

const router = express.Router();

//LIST USERS
router.get("/users", ValidateToken, controllers.getUsers);
//INSERT USER
router.post("/cad-user/", ValidateToken,  controllers.insertNewUser);

//NAME AND isADMIM by ID(não finalizado ainda)
router.get("/userId/:userId",(req, res)=>{
  const userId = req.params.userId;
  return res.json({
    user:"kaio",
    admim: "true",
    userId: userId
  })
})

//QUAL O USUARIO LOGADO NESTA SESSAO
router.get("/loggedUser", ValidateToken,(req, res) =>{
  return res.json({
    userId : req.userId,
    userName : req.userName,
    cargo: req.cargo
  })
} )

export default router;
