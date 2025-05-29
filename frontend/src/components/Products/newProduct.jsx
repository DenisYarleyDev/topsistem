import { useState, useEffect } from "react";
import axios from "axios";
import { backUrl } from "../Constants";
import { createProduct, getAllCategories } from "../../services/Products/productsService";
import Alert from "../Alert";

export default function NewProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    stock: 0,
    category_id: "",
    is_active: true,
    is_uni: false
  });

  const [categories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllCategories(token)
      .then(data => { setCategories(data); })
      .catch(err => {
        console.error("Erro ao buscar categorias:", err);
        setCategories([]);
      });

  }, [token]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(form => ({
      ...form,
      [name]: type === "checkbox"
        ? checked
        : name === "stock" || name === "price"
        ? value.replace(',', '.')
        : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const productData = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      category_id: parseInt(form.category_id, 10)
    };
    createProduct(productData, token)
      .then(() => {
        setAlert({ message: "Produto criado com sucesso!", type: "success" });
        setShowAlert(true);
        setForm({
          name: "",
          description: "",
          price: "",
          image_url: "",
          stock: 0,
          category_id: "",
          is_active: true,
          is_uni: false
        });
        setShowForm(false); // esconde após salvar, remova se quiser manter aberto
      })
      .catch(err => {
        setAlert({ message: "Erro ao criar produto: " + err.message, type: "failed" });
        setShowAlert(true);
      });
  }

  return (
    <div className="w-full max-w-md">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full"
        >
          Cadastrar novo produto
        </button>
      )}

      {showForm && (
        <form
          className="p-6 bg-white rounded-xl shadow flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-bold mb-2">Novo produto</h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold">Nome do produto</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="p-2 rounded border"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-semibold">Descrição (opcional)</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="p-2 rounded border"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="font-semibold">Preço</label>
            <input
              id="price"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min={0}
              step="0.01"
              className="p-2 rounded border"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="image_url" className="font-semibold">URL da imagem (opcional)</label>
            <input
              id="image_url"
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="p-2 rounded border"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="stock" className="font-semibold">Estoque inicial</label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              min={0}
              className="p-2 rounded border"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="category_id" className="font-semibold">Categoria</label>
            <select
              id="category_id"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="p-2 rounded border"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />
            <label htmlFor="is_active" className="font-semibold">Disponível para orçamentos</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_uni"
              name="is_uni"
              checked={form.is_uni}
              onChange={handleChange}
            />
            <label htmlFor="is_uni" className="font-semibold">Produto por unidade</label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 flex-1"
            >
              Salvar produto
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-800 rounded p-2 hover:bg-gray-400 flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {showAlert && (
        <Alert
          onClose={() => setShowAlert(false)}
          message={alert.message}
          type={alert.type}
        />
      )}
    </div>
  );
}
