import { useState, useEffect } from "react";
import axios from "axios";
import { backUrl } from "../Constants";

export default function NewProduct({ onSave }) {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    dimensoes: "",
    cor: "",
    preco: "",
    observacao: ""
  });

  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  // Busca as categorias ao carregar o componente
  useEffect(() => {
    async function fetchCategories() {
      try {
        
        const resp = await axios.get(`${backUrl}/products-categories`,
          { headers: { "x-access-token": token } }
        );
        setCategories(resp.data); // resp.data deve ser array de {id, name}
        console.log("Categorias carregadas:", resp);
      } catch (err) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, [token]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSave) onSave(form);
    setForm({
      nome: "",
      categoria: "",
      dimensoes: "",
      cor: "",
      preco: "",
      observacao: ""
    });
  }

  return (
    <form
      className="w-full max-w-md p-6 bg-white rounded-xl shadow flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold mb-2">Inserir novo produto</h2>

      <input
        type="text"
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Nome do produto"
        className="p-2 rounded border"
        required
      />

      <select
        name="categoria"
        value={form.categoria}
        onChange={handleChange}
        className="p-2 rounded border"
        required
      >
        <option value="">Selecione uma categoria</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="text"
        name="dimensoes"
        value={form.dimensoes}
        onChange={handleChange}
        placeholder="Dimensões (ex: 2,10x0,80)"
        className="p-2 rounded border"
        required
      />
      <input
        type="text"
        name="cor"
        value={form.cor}
        onChange={handleChange}
        placeholder="Cor"
        className="p-2 rounded border"
      />
      <input
        type="number"
        name="preco"
        value={form.preco}
        onChange={handleChange}
        placeholder="Preço unitário"
        min={0}
        step="0.01"
        className="p-2 rounded border"
        required
      />
      <input
        type="text"
        name="observacao"
        value={form.observacao}
        onChange={handleChange}
        placeholder="Observação"
        className="p-2 rounded border"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
      >
        Salvar produto
      </button>
    </form>
  );
}
