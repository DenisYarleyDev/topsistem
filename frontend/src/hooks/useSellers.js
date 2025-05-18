// hooks/useUsers.js
import { useEffect, useState } from "react";
import sellerService from "../services/Sellers/sellerService.js";

export default function useSellers() {
  const [sellers, setSellers] = useState([]);
  const token = localStorage.getItem("token");

  //FUNÇÃO PARA CARREGAR VENDEDORES
  const loadSellers = () => {
    sellerService
      .getSellers(token)
      .then((res) => {
        setSellers(res.data);
      })
      .catch((err) => {
        console.log({
          message: "erro no loadUser do ./hooks/useUser.js",
          erro: err,
        });
      });
  };

  //EXECUTANDO A FUNÇÃO PARA CARREGAR VENDEDORES
  useEffect(() => {
    loadSellers();
  }, []);

  return { sellers, loadSellers };
}
