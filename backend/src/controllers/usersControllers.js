import * as User from "../models/usersModel.js";

//CONTROLLER FOR LIST USERS
export const getUsers = async (req, res) => {
  await res.json(await User.listUsers());
  const user = req.userId;
};

//CONTROLLER FOR INSERT NEW USER
export const insertNewUser = async (req, res) => {
  const { newUserUsername, newUserPassword, newUserAdmin } = req.body;
  
  if (req.admin === 0) {
    return res.status(403).json({message:"action require admin to insert new user"});
  }

  if (newUserUsername && newUserPassword && newUserAdmin) {
    await User.insertUser(newUserUsername, newUserPassword, newUserAdmin);
    res.send("usuario inserido");
  } else {
    res.send("dados inconsistentes");
  }

  
};
