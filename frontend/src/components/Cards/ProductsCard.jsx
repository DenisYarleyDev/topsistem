// src/components/ProductCard.jsx
export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 max-w-xs w-full h-fit m-3 flex flex-col items-center">
            <img
                src={product.image_url || "https://via.placeholder.com/300x200?text=Sem+Imagem"}
                alt={product.name}
                className="w-full h-44 object-cover rounded-xl mb-3"
            />
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="font-bold text-xl text-green-700 mb-1">R$ {product.price?.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mb-1">
                Categoria: {product.category?.name || "Sem categoria"}
            </p>
            <p className={`font-semibold text-xs mb-1 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock > 0 ? `Estoque: ${product.stock}` : "Fora de estoque"}
            </p>
            <p className={`text-xs ${product.is_active ? "text-blue-600" : "text-red-500"} mb-1`}>
                {product.is_active ? "Ativo" : "Inativo"}
            </p>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
                Criado em: {new Date(product.created_at).toLocaleDateString()}<br />
                Atualizado em: {new Date(product.updated_at).toLocaleDateString()}
            </p>
        </div>
    );
}
