const API_URL = 'http://localhost:3000/transactions';

export async function getTransactions() {

  const token = localStorage.getItem('token');
  const response = await fetch(API_URL,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar transações');
  }

  return response.json();
}
export async function createTransaction(transaction) {

  const token = localStorage.getItem('token');

  const response = await fetch(
    'http://localhost:3000/transactions',
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(transaction)
    }
  );

  if (!response.ok) {
    throw new Error('Erro ao criar transação');
  }

  return response.json();
}