// src/pages/CadUser.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backUrl } from "../components/Constants";
import useUsers from "../hooks/useUsers";
import UserForm from "../components/CadUser/UserForm";
import UserTable from "../components/CadUser/UserTable";
import Alert from "../components/Alert";
import userService from "../services/CadUser/userService";



export default function CadUser() {
  
  const navigate = useNavigate();
  const { users, loadUsers } = useUsers();

  const [cargoCode, setCargoCode] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // Estado do formulário
  const [form, setForm] = useState({
    user: "",
    password: "",
    admin: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  // 1) Busca dados do usuário logado e seta cargoCode
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    async function fetchLoggedUser() {
      try {
        const { data } = await axios.get(
          `${backUrl}/loggedUser`,
          { headers: { "x-access-token": token } }
        );
        setCargoCode(data.cargo);
      } catch (err) {
        console.error("Erro ao buscar usuário logado:", err);
        navigate("/");
      }
    }

    fetchLoggedUser();
  }, [token, navigate]);

  // 2) Redireciona se usuário não for SUPERUSER (1) ou ADMIN (2)
  useEffect(() => {
    if (cargoCode !== null && cargoCode !== 1 && cargoCode !== 2) {
      navigate("/home");
    }
  }, [cargoCode, navigate]);

  // 3) Editar usuário existente
  const handleEdit = (user) => {
    setForm({
      user: user.user,
      password: user.password,
      admin: user.admin === "1",
    });
    setIsEditing(true);
  };

  // 4) Submeter criação/edição
  const handleSubmit = () => {
    const payload = {
      newUserUsername: form.user,
      newUserPassword: form.password,
      newUserAdmin: form.admin ? "1" : "0",
    };

    userService
      .createUser(payload, token)
      .then(() => {
        loadUsers();
        setAlert({ message: "Usuário cadastrado com sucesso!", type: "success" });
        setShowAlert(true);
        setForm({ user: "", password: "", admin: false });
        setIsEditing(false);
      })
      .catch((err) => {
        setAlert({ message: err.message, type: "failed" });
        setShowAlert(true);
      });
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-slate-100 w-full">
      {showAlert && (
        <Alert
          onClose={() => setShowAlert(false)}
          message={alert.message}
          type={alert.type}
        />
      )}

      <UserTable currentUserCargo={cargoCode} users={users} onEdit={handleEdit} onDelete={() => {}} />

      <UserForm
        user={form.user}
        password={form.password}
        admin={form.admin}
        isEditing={isEditing}
        onUserChange={(val) => setForm({ ...form, user: val })}
        onPasswordChange={(val) => setForm({ ...form, password: val })}
        onAdminToggle={() => setForm({ ...form, admin: !form.admin })}
        onSubmit={handleSubmit}
        onCancelEdit={() => setIsEditing(false)}
      />
    </div>
  );
}
