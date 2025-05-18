import { login } from "../models/loginModel.js";
import { generateToken } from "../services/auth/genereteToken.js";

//LOGIN
export const userLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(401).json({ logged: false, message: "Usuário não encontrado" });
  }
  //DATABASE USER
  const user = await login(username);

  if (!user) {
    return res.status(401).json({ logged: false, message: "Usuário não existe!" });
  }

  //QUERY USER
  if (user.username == username && user.password == password) {
    //GENERATE 
    const token = generateToken(user.id, user.username, user.cargo);
    return res.json({ logged: true, token });
  } else {
    res.json({ logged: false });
  }
};
