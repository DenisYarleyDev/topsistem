import { House } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuButton from "../buttons/MenuButton";

export default function MenuSide() {
  const navigate = useNavigate();
  //LOGOUT REMOVE TOKEN JWT
  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  //SHOW AND HIDDEN OPTIONS MENUBAR INITIAL STATE
  const stateMenu = {
    dashboard: false,
    cadastro: false,
  };

  const [showMenu, setShowMenu] = useState(stateMenu);

  return (
    <div className="bg-slate-900 min-h-screen w-min space">
      <div className="bg-slate-800 flex justify-center items-center space-x-4 p-10">
        <img src="/logo.png" className="w-[60px]" />
        <h2 className="text-slate-300 font-bold text-sm">
          Top Alumínio e Segurança
        </h2>
      </div>
      <div className="text-white p-6 relative flex flex-col space-y-5 w-[300px] text-md font-light">
        {/* menubutton create buttons and options */}
        <MenuButton
          name={"Dashboard"}
          path={["/home"]}
          buttons={["botão1", "botão2", "botão3"]}
          showMenu={showMenu.dashboard}
          onclick={() => {
            setShowMenu({ ...showMenu, dashboard: !showMenu.dashboard });
          }}
        />
        <MenuButton
          name={"Cadastros"}
          path={["/cad-user", "/cad-seller", "/cad-client", "/cad-product"]}
          buttons={[
            "Cadastro Usuário",
            "Cadastro Vendedor",
            "Cadastro Cliente",
            "Cadastro Produto",
          ]}
          showMenu={showMenu.cadastro}
          onclick={() => {
            setShowMenu({ ...showMenu, cadastro: !showMenu.cadastro });
          }}
        />
      </div>
      <div
        onClick={logout}
        className="text-slate-300 bg-slate-800 flex flex-col items-center cursor-pointer space-y-5 p-2 text-md font-light animate-fade-in-2"
      >
        SAIR
      </div>
    </div>
  );
}
