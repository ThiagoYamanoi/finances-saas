import { authenticatedFetch } from "./apiClient";

export async function getCategories() {

  const response = await authenticatedFetch(
    "http://localhost:3000/categories"
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }

  return response.json();
}