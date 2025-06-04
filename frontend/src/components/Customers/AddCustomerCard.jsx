import { useState } from "react";
import PhoneInput from './PhoneInput';
import createCostumer from "../../services/Customers/CustomersServices";
export default function AddCustomerCard({ onAdd }) {
  const [addCustomersOpen, setCustomersOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    address: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    createCostumer(form, token)
      .then(() => {
        setAlert({ message: "Cliente cadastrado com sucesso!", type: "success" });
        setShowAlert(true);
        setForm({ name: "", email: "", cpf: "", phone: "", address: "" });
        if (onAdd) onAdd();
      })
      .catch(err => {
        setAlert({ message: "Erro ao cadastrar cliente " + err.message, type: "failed" });
        setShowAlert(true);
      });
  }

  return (
    <div>


      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Adicionar Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            placeholder="CPF"
            required
          />
          <PhoneInput value={form.phone} onChange={handleChange} />

          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Endereço"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all mt-2"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div> 
  );
}
