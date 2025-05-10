// pages/CadUser.jsx
import useUsers from "../hooks/useUsers";
import UserForm from "../components/CadUser/UserForm";
import UserTable from "../components/CadUser/UserTable";
import Alert from "../components/Alert";
import userService from "../services/CadUser/userService";
import { useState } from "react";

export default function CadUser() {
  const { users, loggedUser, loadUsers } = useUsers();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // form state
  const [form, setForm] = useState({ user: "", password: "", admin: false });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (user) => {
    setForm({
      user: user.user,
      password: user.password,
      admin: user.admin == "1",
    });
    setIsEditing(true);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const data = {
      user: form.user,
      password: form.password,
      admin: form.admin ? "1" : "0",
    };

    userService
      .createUser(data, token, loggedUser)
      .then(() => {
        loadUsers();
        setAlert({ message: "Usuário cadastrado com sucesso!", type: "success" });
        setShowAlert(true);
      })
      .catch(() => {
        setAlert({ message: "Erro ao cadastrar usuário", type: "failed" });
        setShowAlert(true);
      });

    setForm({ user: "", password: "", admin: false });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-slate-100 w-full">
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} message={alert.message} type={alert.type} />
      )}
      <UserTable users={users} onEdit={handleEdit} onDelete={() => { }} />
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
