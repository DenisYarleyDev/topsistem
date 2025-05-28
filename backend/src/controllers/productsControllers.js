//PRODUCTSCONTROLER.js
import prisma from "../config/prisma/index.js";

export const getAll = async (req, res) => {
  //ROTA PARA LISTAR TODOS PRODUTOS
  const getAll = await prisma.product.findMany()
  return res.send(getAll)
}

export const getAllCategories = async (req, res) => {
  //ROTA PARA LISTAR TODOS PRODUTOS
  const getAllCategories = await prisma.category.findMany()
  return res.send(getAllCategories)
}


