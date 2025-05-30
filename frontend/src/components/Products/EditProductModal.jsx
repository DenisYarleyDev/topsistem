import { useState, useEffect } from "react";
import { getAllCategories, updateProduct } from "../../services/Products/productsService";
import Alert from "../Alert";

export default function EditProductModal({ product, onClose, onProductUpdated }) {
  const [form, setForm] = useState({ ...product });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllCategories(token)
      .then(data => setCategories(data))
      .catch(err => setCategories([]));
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

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category_id", form.category_id);
    formData.append("is_active", form.is_active);
    formData.append("is_uni", form.is_uni);
    if (image) formData.append("image", image);

    updateProduct(product.id, formData, token)
      .then(() => {
        setAlert({ message: "Produto atualizado com sucesso!", type: "success" });
        setShowAlert(true);
        if (onProductUpdated) onProductUpdated();
        onClose();
      })
      .catch(err => {
        setAlert({ message: "Erro ao atualizar produto: " + err.message, type: "failed" });
        setShowAlert(true);
      });
  }

  return (
    <div onClick={onClose} className="fixed inset-0   bg-black/50 z-40 flex items-center justify-center">
      <div
        onClick={e => e.stopPropagation()}
        className=" bg-white p-6 rounded-xl shadow w-full max-w-lg">
        <h2 className="text-lg font-bold mb-2">Editar produto</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inputs igual NewProduct */}
          {/* ... Copie os campos de NewProduct aqui, só troque setForm(form) por setForm(form => ...), value=form.campo */}
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
          <div className="flex flex-col col-span-2 gap-1">
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
            <label htmlFor="image" className="font-semibold">Imagem do produto</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              className="p-2 rounded border"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="stock" className="font-semibold">Estoque</label>
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
          <div className="flex gap-2 col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 flex-1"
            >
              Salvar alterações
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 rounded p-2 hover:bg-gray-400 flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
        {showAlert && (
          <Alert
            onClose={() => setShowAlert(false)}
            message={alert.message}
            type={alert.type}
          />
        )}
      </div>
    </div>
  );
}
