export async function getAccounts() {
  const response = await fetch(
    'http://localhost:3000/accounts'
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar contas');
  }

  return response.json();
}