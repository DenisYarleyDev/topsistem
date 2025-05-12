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
  axios.get(`${backUrl}/logedUser`, {
    headers: {
      "x-access-token": token
    }
  });

const createUser = (data, token, loggedUser) =>
  axios.post(`${backUrl}/cad-user/${loggedUser}`, data, {
    headers: { "x-access-token": token },
  });

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
