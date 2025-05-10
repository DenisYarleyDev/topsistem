// hooks/useUsers.js
import { useEffect, useState } from "react";
import userService from "../services/CadUser/userService";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const token = localStorage.getItem("token");

  const loadUsers = () => {
    userService.getUsers(token).then((res) => setUsers(res.data.result));
  };

  const loadLoggedUser = () => {
    userService.getLoggedUser(token).then((res) => setLoggedUser(res.data.user));
  };

  useEffect(() => {
    loadUsers();
    loadLoggedUser();
  }, []);

  return { users, loggedUser, loadUsers };
}
