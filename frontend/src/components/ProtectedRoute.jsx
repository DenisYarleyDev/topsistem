import { useNavigate } from "react-router-dom";
import { backUrl } from "./Constants";
import axios from "axios";
import { useEffect } from "react";

//FRONT COMPONENT PROTECTED ROUTES
export default function ProtectedRoute({ children }) {

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

  return children;
}
