import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
    baseURL: 'http://ec2-18-188-63-245.us-east-2.compute.amazonaws.com',
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@app:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});