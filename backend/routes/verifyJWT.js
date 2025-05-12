import express from "express";

import { validateToken } from "../server.js";

const router = express.Router();

//rota para verificar verificar JWT
router.post("/verifyJWT", validateToken, (req, res) => {
    return res.json({ "valid": true });
});

export default router;
