import axios from "axios";
import { backUrl } from "../../components/Constants";



export default async function createCustomer(customerData, token) {
    try {
        const response = await axios.post(`${backUrl}/create-customer`, customerData, {
            headers: {
                "x-access-token": token,
            }
        });
        return response.data; // Retorna o produto criado
    } catch (err) {
        console.error("Erro ao criar Customer:", err);
        throw err; // Propaga o erro para ser tratado pelo chamador
    }
}



