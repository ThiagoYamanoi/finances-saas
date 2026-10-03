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