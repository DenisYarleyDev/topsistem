import { useEffect } from "react";
import { useState } from "react";
import {getAllProducts, getAllCategories} from "../services/Products/productsService";
import ProductCard from "../components/Cards/ProductsCard";


export default function Products() {
    const [products, setProducts] = useState([]);
    const [productsCategories, setProductsCategories] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchProducts() {
            const products = await getAllProducts(token);
            setProducts(products);
        }
        async function fetchProductsCategories() {
            const productsCategories = await getAllCategories(token);
            setProductsCategories(productsCategories);
        }
        fetchProducts();
        fetchProductsCategories();
    }, [token]);

    function getProductsByCategory(categoryId) {
        return products.filter(prod => prod.category_id === categoryId);
    }

    return (
        <div className="flex flex-col gap-10 p-6 bg-gray-50 min-h-full w-full">
            {productsCategories.map(category => {
                const prods = getProductsByCategory(category.id);
                if (prods.length === 0) return null; // Oculta categorias sem produtos
                return (
                    <div key={category.id} className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">{category.name}</h2>
                        <div className="flex overflow-x-auto gap-4 pb-2">
                            {prods.map(prod => (
                                <ProductCard key={prod.id} product={{ ...prod, categoryName: category.name }} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
