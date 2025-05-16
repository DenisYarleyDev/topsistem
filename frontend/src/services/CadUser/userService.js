// services/userService.js
import axios from "axios";
import { backUrl } from "../../components/Constants";

const getUsers = (token) =>
  axios.get(`${backUrl}/users`, {
    headers: {
      "x-access-token": token
    }
  });

const getLoggedUser = (token) =>
  axios.get(`${backUrl}/loggedUser`, {
    headers: {
      "x-access-token": token
    }
  });

const createUser = async (data, token) => {
  try {
    const res = await axios.post(`${backUrl}/cad-user/`, data, {
      headers: { "x-access-token": token },
    });
    return res.data;
  } catch (err) {
    // extrai a mensagem de erro do back ou usa fallback genérico
    const msg =
      err.response?.data?.message || // seu { message: '...' }
      err.response?.data?.erro ||    // caso use “erro” em PT-BR
      err.message ||                 // fallback do Axios
      "Erro desconhecido";
    // lança um Error com essa mensagem
    throw new Error(msg);
  }
};

const deleteUser = (loggedUser, userId, token) =>
  axios.delete(`${backUrl}/del-user/${loggedUser}/${userId}`, {
    headers: { "x-access-token": token },
  });

const getUserByUsername = (username) =>
  axios.get(`${backUrl}/user/${username}`);
          
export default {
  getUsers,
  getLoggedUser,
  createUser,
  deleteUser,
  getUserByUsername,
};
