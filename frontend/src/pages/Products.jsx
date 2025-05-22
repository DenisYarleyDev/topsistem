// src/pages/Products.jsx
import { useEffect, useState } from "react";
import getAllProducts from "../services/Products/productsService";
import ProductCard from "../components/Cards/ProductsCard";

export default function Products() {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchProducts() {
            const products = await getAllProducts(token);
            setProducts(products);
        }
        fetchProducts();
    }, [token]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 min-h-full w-full">
            {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
            ))}
        </div>
    );
}
