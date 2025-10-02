import { api } from "./api";

export const getProducts = async () => {
  try {
    const { data } = await api.get("/api/produtos");
    return data.produtos;
  } catch (error) {
    console.error("Algo deu errado ao listar os produtos", error);
    throw error;
  }
};