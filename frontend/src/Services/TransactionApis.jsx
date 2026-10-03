import { authenticatedFetch } from "./apiClient";
import { API_URL } from './apiConfig';


export async function getTransactions() {

  const response = await authenticatedFetch(`${API_URL}/transactions`);

  if (!response.ok) {
    throw new Error('Erro ao buscar transações');
  }

  return response.json();
}


export async function createTransaction(transaction) {

  const response = await authenticatedFetch(
    `${API_URL}/transactions`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(transaction)
    }
  );

  if (!response.ok) {
    throw new Error('Erro ao criar transação');
  }

  return response.json();
}