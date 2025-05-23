import prisma from "../../config/prisma/index";

// Dicionário de models Prisma
const models = {
    products: prisma.product,
    categories: prisma.category,
    // ...adicione outros models conforme seu schema
};

// POST /audit-logs
export default async function AuditLogs(req, res) {
    try {
        const {
            table_name,
            record_id,
            action,
            old_data: oldDataFromBody,
            new_data: newDataFromBody,
        } = req.body;

        const changed_by = req.userId;

        if (!table_name || !record_id || !action || !changed_by) {
            return res.status(400).json({ message: "Dados obrigatórios faltando." });
        }

        let old_data = oldDataFromBody;

        // Busca old_data do banco se não foi informado
        if (!old_data && models[table_name]) {
            old_data = await models[table_name].findUnique({
                where: { id: record_id },
            });
        }

        let new_data = newDataFromBody;

        // Busca old_data do banco se não foi informado
        if (!old_data && models[table_name]) {
            old_data = await models[table_name].findUnique({
                where: { id: record_id },
            });
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
