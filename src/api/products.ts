import { api } from "./api";

export const getProducts = async () => {
  try {
    const { data } = await api.get("/api/produtos");
    console.log(data.produtos)
    return data.produtos;
  } catch (error) {
    console.error("Algo deu errado ao listar os produtos", error);
    throw error;
  }
};

export const getProductId = async (id: number) => {
  try {
    const {data}  = await api.get(`/api/produtos/${id}`);
    return data;
  } catch (error) {
    console.error("Algo deu errado ao listar os produtos", error);
    throw error;
  }
};