import { API_URL } from './apiConfig';


export async function sendLogin(email, password){
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email,
    password
  })
});

const data = await response.json();
if (!response.ok) {
    throw new Error('Erro ao fazer login');
  }

  return data;
}