// services/userService.js

// Dados mockados
let mockDataUsers = [
  { id: 1, user: "Paulo", password: 1234, admin: 1 },
  { id: 2, user: "Lucas", password: 1234, admin: 1 },
  { id: 3, user: "João", password: 1234, admin: 1 },
  { id: 4, user: "Pedro", password: 1234, admin: 1 },
];

// Simula um delay como se fosse uma requisição real
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Funções mockadas
const getUsers = async () => {
  await delay(300); // simula tempo de resposta
  return { data: { result: mockDataUsers } };
};

const getLoggedUser = async () => {
  await delay(100);
  return { data: { user: "admin" } };
};

const createUser = async (data) => {
  await delay(200);
  const exists = mockDataUsers.find((u) => u.user === data.user);
  if (exists) {
    return Promise.reject({ message: "Usuário já existe" });
  }

  const newUser = {
    ...data,
    id: mockDataUsers.length + 1,
  };

  mockDataUsers.push(newUser);

  return { data: { success: true } };
};

const deleteUser = async (userId) => {
  await delay(200);
  const originalLength = mockDataUsers.length;
  mockDataUsers = mockDataUsers.filter((user) => user.id !== userId);
  if (mockDataUsers.length === originalLength) {
    return Promise.reject({ message: "Usuário não encontrado" });
  }

  return { data: { success: true } };
};

const getUserByUsername = async (username) => {
  await delay(100);
  const results = mockDataUsers.filter((user) => user.user === username);
  return { data: { results } };
};

export default {
  getUsers,
  getLoggedUser,
  createUser,
  deleteUser,
  getUserByUsername,
};
