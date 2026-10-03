import { authenticatedFetch } from "./apiClient";
import { API_URL } from './apiConfig';

export async function getAccounts() {

  const response = await authenticatedFetch(
    `${API_URL}/accounts`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar contas');
  }

  return response.json();
}