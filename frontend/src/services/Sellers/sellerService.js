// services/userService.js
import axios from "axios";
import { backUrl } from "../../components/Constants";

const getSellers = (token) =>
  axios.get(`${backUrl}/sellers`, {
    headers: {
      "x-access-token": token,
    },
  });

const getLoggedUser = (token) =>
  axios.get(`${backUrl}/loggedUser`, {
    headers: {
      "x-access-token": token,
    },
  });

const inactiveUser = (id) => {
  axios
    .put(`${backUrl}/sellersInactive`, {
      id: id,
    })
    .then(() => {
      console.log("Usuáro desativado com sucesso!");
    })
    .catch(() => {
      console.log("Erro ao desativar usuário");
      console.log(id);
    });
};

export default {
  getSellers,
  getLoggedUser,
  inactiveUser,
};
