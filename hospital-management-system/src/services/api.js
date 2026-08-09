import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const AI_API_BASE_URL = import.meta.env.VITE_AI_API_BASE_URL || 'http://localhost:8000/api/v1/ai';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const aiApi = axios.create({
  baseURL: AI_API_BASE_URL,
});

const addToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(addToken, (error) => Promise.reject(error));
aiApi.interceptors.request.use(addToken, (error) => Promise.reject(error));

export default api;

