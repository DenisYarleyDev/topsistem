import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backUrl } from "./Constants";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [username, setUsername] = useState("");
    const [cargoCode, setCargoCode] = useState(null);
    const [cargoLabel, setCargoLabel] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let intervalId;

        async function fetchUser() {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
                return;
            }
            try {
                const resp = await axios.get(
                    `${backUrl}/loggedUser`,
                    { headers: { "x-access-token": token } }
                );
                setUsername(resp.data.userName);
                setCargoCode(resp.data.cargo);
                if (resp.data.cargo === 1) setCargoLabel("SUPERUSER");
                else if (resp.data.cargo === 2) setCargoLabel("ADMIN");
                else if (resp.data.cargo === 3) setCargoLabel("VENDEDOR");
                else setCargoLabel("");
            } catch (err) {
                localStorage.removeItem("token");
                setUsername("");
                setCargoCode(null);
                setCargoLabel("");
                navigate("/");
            }
        }

        // Chama imediatamente ao montar
        fetchUser();

        // Verifica a cada 10 segundos
        intervalId = setInterval(fetchUser, 10_000);

        // Cleanup ao desmontar
        return () => clearInterval(intervalId);
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ username, cargoCode, cargoLabel }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
