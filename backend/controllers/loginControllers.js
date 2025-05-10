import { login } from "../models/loginModel.js";
import { generateToken } from "../server.js";

//LOGIN
export const userLogin = async (req, res) => {
  const { username, password } = req.body;

  //DATABASE USER
  const user = await login(username);

  //QUERY USER
  if (user.username == username && user.password == password) {
    //GENERATE JWT
    const token = generateToken(user.id);
    return res.json({ logged: true, token });
  } else {
    res.json({ logged: false });
  }
};
