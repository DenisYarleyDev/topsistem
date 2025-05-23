import axios from "axios";
import { backUrl } from "../../components/Constants";

export async function getAllProducts(token) {
    try {
        const response = await axios.get(`${backUrl}/products`, {
            headers: { "x-access-token": token }
        });
        return (response.data); // Aqui é o array de produtos!
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getAllCategories(token) {
    try {
        const response = await axios.get(`${backUrl}/products-categories`, {
            headers: { "x-access-token": token }
        });
        return (response.data); // Aqui é o array de produtos!
    } catch (err) {
        console.log(err);
        return [];
    }
}


