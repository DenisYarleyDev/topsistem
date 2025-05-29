// PRODUCTSCONTROLLER.js
import prisma from "../config/prisma/index.js";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

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
  // Dados do form
  const {
    name,
    description,
    price,
    stock,
    category_id,
    is_active,
    is_uni
  } = req.body;

  let image_url = null;
  try {
    // Se tiver arquivo, renomeia e move pra pasta uploads/
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const newName = uuidv4() + ext;
      const destPath = path.join('public/imgs/products', newName);
      fs.renameSync(req.file.path, destPath);
      image_url = destPath.replace(/\\/g, '/'); // deixa o caminho universal (Windows/Linux)
    }

   
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: price ? Number(price) : 0,
        image_url, // agora salva o caminho da imagem!
        stock: stock !== undefined ? Number(stock) : 0,
        category_id: Number(category_id),
        is_active: is_active==="true" ? true : false, 
        is_uni: is_uni==="true" ? true : false 
      }
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return res.status(500).json({ error: "Erro ao criar produto" });
  }
};