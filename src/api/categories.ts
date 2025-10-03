import { api } from "./api";

export const getCategories = async () => {
    try{
        const { data } = await api.get("/api/categoria");
        return data.categorias;
    }catch(error) {
        console.error("Algo deu errado ao buscar as categorias:", error);
        throw error;
    }
}