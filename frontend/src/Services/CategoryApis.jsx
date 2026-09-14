export async function getCategories() {
  const token = localStorage.getItem('token');
  const response = await fetch(
    'http://localhost:3000/categories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }

  return response.json();
}