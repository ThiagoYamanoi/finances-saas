export async function authenticatedFetch(url, options = {}) {

    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        ...options,

        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/login";

        throw new Error("Sessão expirada");
    }

    return response;
}