import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Users, LogOut, UserCircle2 } from "lucide-react";
import axios from "axios";
import { backUrl } from "./Constants";

export default function MenuSide() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  // definição dos itens de menu
  const menuItems = [
    { 
      name: "Dashboard", 
      icon: Home, 
      to: "/home" 
    },
    {
      name: "Cadastro",
      icon: Users,
      subItems: [
        { name: "Clientes", to: "/cad-client" },
        { name: "Usuários", to: "/cad-user" },
        { name: "Vendedores", to: "/cad-seller" }, 
        { name: "Produtos", to: "/cad-product" },
      ],
    },
  ];

  // busca usuário e permissão
  useEffect(() => {
    (async () => {
      try {
        const {data}  = await axios.get(
          `${backUrl}/loggedUser`,
          { headers: { "x-access-token": token } }
        );
        setUsername(data.userName);
        if(data.admin===1){
          setIsAdmin(true);
        }
        
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <aside className="flex-shrink-0 w-60 bg-slate-900 text-slate-200 flex flex-col">
      {/* Branding */}
      <div className="bg-slate-800 flex items-center gap-3 px-6 py-5">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <div>
          <h1 className="text-lg font-bold">TOP Alumínio</h1>
          <p className="text-xs text-gray-400">e Segurança</p>
        </div>
      </div>

      {/* Usuário logado */}
      <div className="flex items-center px-6 py-3 border-b border-slate-700">
        <UserCircle2 className="w-5 h-5 mr-2 text-green-500" />
        <span className="flex-1">{username}</span>
        {isAdmin ? (
          <span className="px-2 py-0.5 text-xs font-semibold bg-blue-800 rounded">
            ADM 
          </span>
        ) : (<div>Nao ADM</div>)}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasSub = Array.isArray(item.subItems);
          const isOpen = openMenus[item.name];

          return (
            <div key={item.name}>
              {hasSub ? (
                <button
                  onClick={() =>
                    setOpenMenus((prev) => ({
                      ...prev,
                      [item.name]: !prev[item.name],
                    }))
                  }
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 6L14 10L6 14V6Z" />
                  </svg>
                </button>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      isActive
                        ? "bg-slate-800 font-semibold text-green-400"
                        : "hover:bg-slate-800"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              )}

              {/* Submenu */}
              {hasSub && isOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        `block px-3 py-1 rounded transition-colors text-sm ${
                          isActive
                            ? "bg-slate-700 text-green-300 font-medium"
                            : "hover:bg-slate-800"
                        }`
                      }
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 transition-colors text-sm"
      >
        <LogOut className="w-5 h-5" />
        Sair
      </button>
    </aside>
  );
}
