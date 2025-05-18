import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import MenuSide from "./MenuSide.jsx";
import { backUrl } from "./Constants.jsx";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId; // sem anotação de tipo

    async function verifyJWT() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.post(
          `${backUrl}/verifyJWT`,
          {},
          {
            headers: { "x-access-token": token },
          }
        );

        if (!response.data.valid) {
          navigate("/");
        }
      } catch (err) {
        console.error("Erro ao verificar token:", err);
        navigate("/");
      }
    }

    // chama na montagem
    verifyJWT();

    // agenda execução a cada 10s
    intervalId = setInterval(verifyJWT, 10_000);

    // cleanup ao desmontar
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex flex-row bg-white">
      <MenuSide />
      <Outlet />
    </div>
  );
}
