// pages/CadUser.jsx
import useSellers from "../hooks/useSellers.js";
import UserForm from "../components/CadUser/UserForm";
import Alert from "../components/Alert";
import userService from "../services/Sellers/sellerService.js";
import { useState } from "react";
import SellersTable from "../components/SellersTable/SellersTable.jsx";

export default function Sellers() {
  const { sellers, loadSellers } = useSellers();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // form state
  const [form, setForm] = useState({ user: "", password: "", admin: false });
  const [isEditing, setIsEditing] = useState(false);

  //EDITAR VENDEDOR - FALTA CONFIGURAR
  const handleEdit = (user) => {
    setForm({
      user: user.user,
      password: user.password,
      admin: user.admin == "1",
    });
    setIsEditing(true);
  };

  //FUNÇÃO PARA DESATIVAR VENDEDOR
  const handleDelete = (id) => {
    userService.inactiveUser(id);
    loadSellers();

    setAlert({
      message: "Usuário desativado com sucesso!",
      type: "success",
    });
    setShowAlert(true);
  };

  //CADASTRAR VENDEDOR - FALTA CONFIGURAR
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const data = {
      newUserUsername: form.user,
      newUserPassword: form.password,
      newUserAdmin: form.admin ? "1" : "0",
    };

    userService
      .createUser(data, token)
      .then(() => {
        loadSellers();
        setAlert({
          message: "Usuário cadastrado com sucesso!",
          type: "success",
        });
        setShowAlert(true);
      })
      .catch((err) => {
        setAlert({ message: err.message, type: "failed" });
        setShowAlert(true);
      });

    setForm({ user: "", password: "", admin: false });
    setIsEditing(false);
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
      <SellersTable
        users={sellers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <UserForm
        {...form}
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
