import { authenticatedFetch } from "./apiClient";
import { API_URL } from './apiConfig';


export async function getConnectToken() {

    const response = await fetch(
        `${API_URL}/bank/connect`,
        {
            method: "POST"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao criar Connect Token");
    }

    const data = await response.json();

    return data.accessToken;
}


export async function syncBankData() {

    const response = await authenticatedFetch(
        `${API_URL}/bank/sync`,
        {
            method: "POST"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Erro ao sincronizar dados bancários"
        );
    }

    return data;
}


export async function saveBankConnection(itemId) {

    const response = await authenticatedFetch(
        `${API_URL}/bank/connections`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                itemId
            })
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao salvar conexão bancária");
    }

    return await response.json();
}