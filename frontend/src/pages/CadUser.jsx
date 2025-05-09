import { useEffect, useState } from "react";
import axios from "axios";
import { backUrl } from "../components/Constants.jsx";
import { useNavigate } from "react-router-dom";
import { PenLine, Trash, Trash2 } from "lucide-react";
import Alert from "../components/Alert.jsx";

export default function CadUser() {
  //EDIT STATE
  const [edit, setEdit] = useState(false);

  //ALERT NOTIFICATION
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  //MOCK DE DADOS PARA LISTAR NO FRONT
  const mockDataUsers = [
    {
      id: 1,
      user: "Paulo",
      password: 1234,
      admin: 1,
    },
    {
      id: 2,
      user: "Lucas",
      password: 1234,
      admin: 1,
    },
    {
      id: 3,
      user: "João",
      password: 1234,
      admin: 1,
    },
    {
      id: 4,
      user: "Pedro",
      password: 1234,
      admin: 1,
    },
  ];

  //LIST CAD USERS
  const [users, setUsers] = useState(mockDataUsers);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [LogedUser, getLogedUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${backUrl}/users`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setUsers(res.data.result);
      })
      .catch(() => {
        //IF TOKEN EXPIRED OR INVALID
        //desativado para acessar pagina protegida
        // localStorage.removeItem("token");
        // navigate("/");
      });
  }, []);

  //GET LOGGED USER
  useEffect(() => {
    axios
      .get(`${backUrl}/logedUser`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        getLogedUser(res.data.user);
      });
  }, []);

  //CAD NEW USER
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("0");

  //STATE ADMIN
  const [isAdmin, setIfAdmin] = useState(false);

  function newUser() {
    //INSERT NEW USER
    if (user && password) {
      axios
        .post(
          `${backUrl}/cad-user/${LogedUser}`,
          {
            user: user,
            password: password,
            admin: admin,
          },
          {
            headers: {
              "x-access-token": token,
            },
          }
        )
        .then(() => {
          //RESFRESH USERS
          axios
            .get(`${backUrl}/users`, {
              headers: {
                "x-access-token": token,
              },
            })
            .then((res) => {
              setUsers(res.data.result);
            });

          //SUCCESS ON CAD USER
          setShow(true);
          setMessage("Novo usuário casdatrado com sucesso!");
          setType("success");
        })
        .catch(() => {
          axios.get(`${backUrl}/user/${user}`).then((res) => {
            if (res.data.results.length == 0) {
              setShow(true);
              setMessage("Sem permissão para cadastrar usuários!");
              setType("failed");
            } else {
              setShow(true);
              setMessage("Usuário já cadastrado!");
              setType("failed");
            }
          });
        });
    } else {
      //FAILED ON CAD USER
      setShow(true);
      setMessage("Usuário ou senha invalidos!");
      setType("failed");
    }
  }

  function editUser() {
    console.log(`${user} editado com sucesso!`);
  }

  //DELETE USER
  function deleteUser(user) {
    axios
      .delete(`${backUrl}/del-user/${LogedUser}/${user}`)
      .then(() => {
        //RESFRESH USERS
        axios
          .get(`${backUrl}/users`, {
            headers: {
              "x-access-token": token,
            },
          })
          .then((res) => {
            setUsers(res.data.result);
            setShow(true);
            setType("success");
            setMessage("Usuário excluído com sucesso!");
          });
      })
      .catch(() => {
        setShow(true);
        setType("failed");
        setMessage("Erro, sem permissão para excluir usuário!");
      });
  }

  return (
    <div className="relative text-sm  text-gray-600">
      {show && <Alert onClose={setShow} message={message} type={type} />}
      <table className="table-fixed w-full overflow-y-scroll max-h-[50%]">
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
              <tr key={user.id}>
                <td className="border-y border-gray-300 px-4 py-2">
                  {user.id}
                </td>
                <td className="border-y border-gray-300 px-4 py-2">
                  {user.user}
                </td>
                <td className="border-y border-gray-300 px-4 py-2">
                  <div className="flex felx-row justify-between">
                    <div>{user.admin ? "sim" : "não"}</div>
                    <div className="flex felx-row gap-2">
                      <button
                        onClick={() => {
                          console.log(`Editando ${user.user}`);
                          setEdit(true);
                          setUser(user.user);
                          setPassword(user.password);

                          if (user.admin == "1") {
                            setIfAdmin(true);
                          } else {
                            setIfAdmin(false);
                          }
                        }}
                        className="hover:text-green-500 cursor-pointer"
                      >
                        <PenLine size={20} />
                      </button>
                      <button
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                        className="hover:text-green-500 cursor-pointer"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form className="bg-slate-300 border-y-2 gap-4 border-slate-400 flex flex-row p-4 absolute bottom-0 w-full">
        <div className="flex flex-col">
          <label htmlFor="usuario">Usuário</label>
          <input
            id="usuario"
            name="usuario"
            className="w-full p-1 border bg-white border-gray-300 rounded-lg"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            value={user}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            name="senha"
            className="w-full p-1 border bg-white border-gray-300 rounded-lg"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <label htmlFor="admin">Admin</label>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked == true) {
                setAdmin("1");
              } else {
                setAdmin("0");
              }
            }}
            checked={isAdmin ? isAdmin : null}
            name="admin"
            id="admin"
          />
        </div>
        {edit ? (
          <button
            type="button"
            className="w-[150px] bg-green-600 text-white p-1 rounded-lg hover:bg-green-700"
            onClick={() => {
              editUser();
              setEdit(false);
              setUser("");
              setPassword("");
              setIfAdmin(false);
            }}
          >
            Editar
          </button>
        ) : (
          <button
            type="button"
            className="w-[150px] bg-green-600 text-white p-1 rounded-lg hover:bg-green-700"
            onClick={() => {
              newUser();
            }}
          >
            Cadastrar
          </button>
        )}
      </form>
    </div>
  );
}
