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
  const token = await AsyncStorage.getItem("@app:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Erro na requisição:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Erro na resposta da API:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Erro de conexão - sem resposta do servidor:', error.message);
    } else {
      console.error('Erro ao configurar requisição:', error.message);
    }
    return Promise.reject(error);
  }
);