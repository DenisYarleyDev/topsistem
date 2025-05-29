import prisma from "../config/prisma/index.js"; // ajuste o caminho se necessário


// POST /audit-logs
export default async function  AuditLogs(req, res) {
  try {
    const {
      table_name,
      record_id,
      action,
      old_data,
      new_data,
       
    } = req.body;

    const changed_by = req.userId;
    
    console.log(changed_by)
    // Validação básica
    if (!table_name || !record_id || !action) {
      return res.status(400).json({ message: "Dados obrigatórios faltando." });
    }

    const log = await prisma.auditLog.create({
      data: {
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        changed_by,
      },
    });

    res.status(201).json(log);
  } catch (error) {
    console.error("Erro ao registrar audit log:", error);
    res.status(500).json({ message: "Erro ao registrar log." });
  }
};


