// PRODUCTSCONTROLLER.js
import prisma from "../config/prisma/index.js";

export const getAll = async (req, res) => {
  // LISTAR TODOS PRODUTOS
  try {
    const products = await prisma.product.findMany();
    return res.send(products);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    return res.status(500).json({ error: "Erro ao listar produtos" });
  }
};

export const getAllCategories = async (req, res) => {
  // LISTAR TODAS AS CATEGORIAS
  try {
    const categories = await prisma.category.findMany();
    return res.send(categories);
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    return res.status(500).json({ error: "Erro ao listar categorias" });
  }
};

export const createProduct = async (req, res) => {
  // CRIAR PRODUTO
  const {
    name,
    description,
    price,
    image_url,
    stock,
    category_id,
    is_active,
    is_uni
  } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || null,       // Campos opcionais como null se não vierem
        price,
        image_url: image_url || null,
        stock: stock !== undefined ? Number(stock) : 0, // Garante número e default 0
        category_id: Number(category_id),
        is_active: is_active !== undefined ? is_active : true,
        is_uni: is_uni !== undefined ? is_uni : false
      }
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return res.status(500).json({ error: "Erro ao criar produto" });
  }
};
