import { authenticatedFetch } from "./apiClient";
import { API_URL } from './apiConfig';


export async function getCategories() {

  const response = await authenticatedFetch(
    `${API_URL}/categories`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }

  return response.json();
}

export async function createCategory(name, type) {

    const response = await authenticatedFetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            type
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro ao criar categoria");
    }

    return data;
}