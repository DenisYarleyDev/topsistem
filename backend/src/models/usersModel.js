import db from "../config/db.js";

// aqui retornamos o resultado das querys

//LIST USERS IN DATABASE
export async function listUsers() {
  const listUsers = await db.query("SELECT * FROM users").then((res) => {
    return res[0];
  });

  return listUsers;
}

//GET USER FOR NAME IN DATABASE
export async function getUserForName(username) {
  const user = await db
    .query("SELECT * FROM users WHERE username = ?", [username])
    .then((res) => {
      return res[0][0];
    });

  return user;
}

//GET USER FOR ID IN DATABASE
export async function getUserForId(id) {
  const user = await db
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then((res) => {
      return res[0][0];
    });

  return user;
}

//INSERT NEW USER IN DATABASE
export async function insertUser(username, password, admin) {
  if (username && password && admin) {
    await db
      .query("INSERT INTO users (username, password, admin) VALUES (?,?,?)", [
        username,
        password,
        admin,
      ])
      .then((res) => {})
      .catch((err) => {});
  } else {
    console.log("dados inconsistentes");
  }
}
