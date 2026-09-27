import { authenticatedFetch } from "./apiClient";


export async function getConnectToken() {

    const response = await fetch(
        "http://localhost:3000/bank/connect",
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
        "http://localhost:3000/bank/sync",
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
        "http://localhost:3000/bank/connections",
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