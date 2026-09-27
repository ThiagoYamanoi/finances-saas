import { authenticatedFetch } from "./apiClient";

const API_URL = 'http://localhost:3000/transactions';


export async function getTransactions() {

  const response = await authenticatedFetch(API_URL);

  if (!response.ok) {
    throw new Error('Erro ao buscar transações');
  }

  return response.json();
}


export async function createTransaction(transaction) {

  const response = await authenticatedFetch(
    API_URL,
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