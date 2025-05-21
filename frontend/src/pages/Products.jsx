import axios from "axios";
import { backUrl } from "../components/Constants";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(`${backUrl}/products`, {
                    headers: { "x-access-token": token }
                });
                setProducts(response.data); // Aqui é o array de produtos!
            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts();
    }, [token]);

    return (
        <div>
            {products.map((prod) => (
                <div key={prod.id}>
                    <h3>{prod.name}</h3>
                    <p>{prod.description}</p>
                    <p>R$ {prod.price}</p>
                </div>
            ))}
        </div>
    );
}
