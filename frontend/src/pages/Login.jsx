import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const backUrl = "http://localhost:8080";
//COMPONENT LOGIN
function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  //ALERT NOTIFICATION
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  //LOGIN BUTTON
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backUrl}/login`, {
        user: usuario,
        password: senha,
      });

      //GET JWT
      const token = response.data.token;
      //STORAGE JWT
      localStorage.setItem("token", token);

      if (token) {
        //ALERT SUCESS FOR USER
        setMessage("Login Efetuado com Sucesso!");
        setShow(true);
        setType("success");

        //GO TO HOME PAGE
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch {
      //ALERT INVALID DATA LOGIN
      setMessage("Usuário ou Senha Incorretos!");
      setShow(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col space-y-6 items-center p-10">
      {show && <Alert onClose={setShow} message={message} type={type} />}
      <img src={logo} className="w-[120px]" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="usuario"
              className="block text-gray-700 font-medium"
            >
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="senha" className="block text-gray-700 font-medium">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Entrar
          </button>
        </form>
      </div>
      <div className="bg-slate-200 w-full h-[20px] cursor-pointer text-xs text-slate-700 absolute bottom-0 flex items-center justify-center">
        @ftd.media
      </div>
    </div>
  );
}

export default Login;
