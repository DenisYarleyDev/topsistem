import { getUserForName } from "./usersModel.js";

//login route verify username and password
export async function login(username) {
  const user = await getUserForName(username);
  return user;
}
