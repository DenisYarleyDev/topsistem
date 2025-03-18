import { useEffect, useState } from "react";
import axios from "axios";
import { backUrl } from "../components/Constants.jsx";

export default function CadUser() {
  const [users, setUsers] = useState([]);
  //LIST CAD USERS
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${backUrl}/users`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  console.log(users);
  return (
    <div>
      <table className="table-fixed w-full bg-white text-sm  text-gray-600">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-start px-4 py-2 font-medium">ID</th>
            <th className="text-start px-4 py-2 font-medium">Usuário</th>
            <th className="text-start px-4 py-2 font-medium">Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td className="border-y border-gray-300 px-4 py-2">
                  {user.id}
                </td>
                <td className="border-y border-gray-300 px-4 py-2">
                  {user.user}
                </td>
                <td className="border-y border-gray-300 px-4 py-2">
                  <div className="flex felx-row justify-between">
                    <div>{user.admin ? "sim" : "não"}</div>
                    <div>
                      <button>btn1</button>
                      <button>btn2</button>
                      <button>btn3</button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
