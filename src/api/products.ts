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

export const getProductId = async (id: number) => {
  try {
    const {data}  = await api.get(`/api/produtos/${id}`);
    return data;
  } catch (error) {
    console.error("Algo deu errado ao listar os produtos", error);
    throw error;
  }
};

export const patchFavorite = async (productId: number) => {
  try {
    const {data}  = await api.get(`/api/produtos/${productId}/favoritar`);
    return data;
  } catch (error) {
    console.error("Algo deu errado ao listar os produtos", error);
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const {data}  = await api.get(`/api/produtos/favoritos`);
    return data;
  } catch (error) {
    console.error("Algo deu errado ao listar os produtos", error);
    throw error;
  }
};