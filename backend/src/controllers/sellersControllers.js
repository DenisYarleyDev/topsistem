import { sellersInactive, sellersMD } from "../models/sellersModel.js";

export const sellers = async (req, res) => {
  //ROTA PARA LISTAR VENDEDORES
  const result = await sellersMD();
  res.send(result);
};

export const sellersInactiveController = async (req, res) => {
  //ROTA PARA DESATIVAR UM VENDEDOR
  const result = await sellersInactive(req.body.id);
  res.send(result);
};
