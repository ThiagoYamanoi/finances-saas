export async function getConnectToken() {
    const response = await fetch("http://localhost:3000/bank/connect", {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error("Erro ao criar Connect Token");
    }

    const data = await response.json();

    return data.accessToken;
}

export async function saveBankConnection(itemId) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:3000/bank/connections",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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