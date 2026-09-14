export async function getAccounts() {
  
  const token = localStorage.getItem('token');

  const response = await fetch(
    'http://localhost:3000/accounts',
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

  );

  if (!response.ok) {
    throw new Error('Erro ao buscar contas');
  }

  return response.json();
}