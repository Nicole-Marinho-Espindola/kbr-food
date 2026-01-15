import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
    baseURL: 'http://ec2-18-219-222-98.us-east-2.compute.amazonaws.com',
    timeout: 30000, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
  console.log('📤 Fazendo requisição:', config.method?.toUpperCase(), config.url, 'para', config.baseURL);
  const token = await AsyncStorage.getItem("@app:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('❌ Erro na requisição:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ Erro na resposta da API:', {
        url: error.config?.url,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        baseURL: error.config?.baseURL
      });
    } else if (error.request) {
      console.error('❌ Erro de conexão - sem resposta do servidor:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        timeout: error.config?.timeout
      });
    } else {
      console.error('❌ Erro ao configurar requisição:', error.message);
    }
    return Promise.reject(error);
  }
);