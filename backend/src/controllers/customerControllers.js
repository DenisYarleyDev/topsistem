import prisma from "../config/prisma/index.js";

export const create = async (req, res) => {
    // Dados do form
    console.log("Dados do form:", req.body);
    const {
        name,
        email,
        cpf,
        phone,
        address,
    } = req.body;

    const userId = req.userId; // ID do usuário autenticado

    console.log("ID do usuário autenticado:", userId);

    try {

        const newCustomer = await prisma.customer.create({
            data: {
                name: name,
                email : email,
                cpf: cpf,
                phone: phone,
                address : address,
                sellerId : userId, // ID do usuário autenticado
                roleId: 16

            }
        });

        return res.status(201).json(newCustomer);
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return res.status(500).json({ error: "Erro ao criar produto" });
    }
}; 