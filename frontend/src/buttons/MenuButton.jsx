import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MenuButton({ name, onclick, showMenu, path, buttons }) {
  const navigate = useNavigate();
  //MENU ROUTES
  function route(children) {
    switch (children) {
      case "Cadastro Usuário":
        return navigate("/cad-user");
      case "botão1":
        return navigate("/home");
      // adicione outros cases conforme necessário
    }
  }

  return (
    <div
      onClick={onclick}
      className={`${
        path.includes(location.pathname) ? "text-green-500" : "text-white-300"
      } cursor-pointer flex flex-col space-x-3 animate-fade-in-2`}
    >
      <div className="flex flex-row space-x-3">
        <House />
        <div>{name}</div>
      </div>

      <div
        className={`bg-slate-950 absolute left-[100%] overflow-hidden transition-all duration-300 ease-in-out ${
          showMenu ? "opacity-100 translate-x-0" : "hidden translate-x-5"
        } rounded-r-md mt-2 w-[200px] p-2 gap-1 flex flex-col`}
      >
        {buttons.map((element) => (
          <button
            onClick={(e) => route(e.target.innerHTML)}
            className="text-slate-300 cursor-pointer"
            key={element}
          >
            {element}
          </button>
        ))}
      </div>
    </div>
  );
}
