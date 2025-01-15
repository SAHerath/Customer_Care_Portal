import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

const tokenName = 'jwtToken';

// Create an Axios instance
const client: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7155',
  timeout: 30000,
  headers: { Accept: 'application/json' },
});

// Add request interceptor
client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync(tokenName);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
client.interceptors.response.use(
  async (response: AxiosResponse) => {
    const token = response.data?.token;
    if (token) {
      await SecureStore.setItemAsync(tokenName, token);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await SecureStore.getItemAsync(tokenName);
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 5000 > Date.now();
  } catch {
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(tokenName);
};

export const postRequest = async (
  endpoint: string, 
  data: object
): Promise<AxiosResponse | null> => {
  try {
    const response: AxiosResponse = await client.post(endpoint, data);
    return response;
  } catch (error) {
    console.error(`POST request to ${endpoint} failed:`, error);
    return null;
  }
};

export const getRequest = async (
  endpoint: string, 
  params?: object
): Promise<AxiosResponse | null> => {
  try {
    const response: AxiosResponse = await client.get(endpoint, { params });
    return response;
  } catch (error) {
    console.error(`GET request to ${endpoint} failed:`, error);
    return null;
  }
};
