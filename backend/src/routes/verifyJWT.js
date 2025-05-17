import express from "express";
import { ValidateToken } from "../middleware/auth/validadeToken.js";

const router = express.Router();

//rota para verificar verificar JWT
router.post("/verifyJWT", ValidateToken, (req, res) => {
    return res.json({ "valid": true });
});

export default router;
