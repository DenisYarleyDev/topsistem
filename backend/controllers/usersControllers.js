import * as User from "../models/usersModel.js";

//CONTROLLER FOR LIST USERS
export const getUsers = async (req, res) => {
  await res.json(await User.listUsers());
  const user = req.userId;
};

//CONTROLLER FOR INSERT NEW USER
export const insertNewUser = async (req, res) => {
  const { username, password, admin } = req.body;
  const { isAdmin } = req.params;

  //LOGED USER (GET FROM JWT TOKEN)
  const userLogged = await User.getUserForId(isAdmin);

  //IF USER IS ADMIN
  if (userLogged.admin == 1) {
    if (username && password && admin) {
      await User.insertUser(username, password, admin);
      res.send("usuario inserido");
    } else {
      res.send("dados inconsistentes");
    }
  } else {
    res.send("action require admin to insert new user");
  }
};
