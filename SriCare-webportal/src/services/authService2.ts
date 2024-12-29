import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
  return response.data.token; // JWT token
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  // validate token expiration
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
  return payload.exp * 1000 > Date.now();
};

export const logout = (): void => {
  localStorage.removeItem('token');
};
