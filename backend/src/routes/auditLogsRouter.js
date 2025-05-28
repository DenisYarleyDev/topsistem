import express from "express";
import { ValidateToken } from "../middleware/auth/validadeToken.js";
import AuditLogs from "../controllers/auditLogsControllers.js";
const router = express.Router();

//INSERIR LOG DE ALGUMA ALTERACAO
router.post("/audit-logs", ValidateToken, AuditLogs );

  
export default router;
 