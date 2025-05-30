import { useState } from "react";
import { useAuth } from "../authProvider";
import { backUrl } from "../Constants";
import EditProductModal from "./EditProductModal";
// src/components/ProductCard.jsx
export default function ProductCard({ product }) {
    const { username, cargoCode, cargoLabel } = useAuth();
    const [showEdit, setShowEdit] = useState(false);
    function onProductUpdated() {
        setShowEdit(false);
    }
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 max-w-xs w-full h-fit m-3 flex flex-col items-center">
            <img
                src={product.image_url === null ? `${backUrl}/public/imgs/products/no-image.png` : `${backUrl}/${product.image_url}`}
                alt={product.name}
                className="w-full h-44 object-cover rounded-xl mb-3"
            />
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="font-bold text-xl text-green-700 mb-1">R$ {product.price?.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mb-1">
                Categoria: {product.categoryName}
            </p>
            <p className={`font-semibold text-xs mb-1 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock > 0 ? `Estoque: ${product.stock}` : "Fora de estoque"}
            </p>
            <div className="flex flex-row  gap-2 " >
                {(cargoCode === 1 || cargoCode === 2) && (
                    <button
                        className="flex items-center gap-2 px-2 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={() => setShowEdit(true)}
                    >
                        Editar
                    </button>

                )}
                <p className={`flex items-center   ${product.is_active ? "text-blue-600" : "text-red-500"} `}>
                    {product.is_active ? "Ativo" : "Inativo"}
                </p>
            </div>

            <p className="text-[10px] text-gray-400 mt-2 text-center">
                Criado em: {new Date(product.created_at).toLocaleDateString()}<br />
                Atualizado em: {new Date(product.updated_at).toLocaleDateString()}
            </p>
            {showEdit && (
                <EditProductModal
                    product={product}
                    onClose={() => setShowEdit(false)}
                    onProductUpdated={onProductUpdated}
                />
            )}
        </div>
    );
}
