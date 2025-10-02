import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "~/api/products";

interface Product {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  categoriaID: number;
  categoriaNome: string;
  descricao: string;
}

interface ProductContextProps {
  products: Product[];
  listProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextProps>({} as ProductContextProps);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  async function listProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao listar produtos", error);
    }
  }

  useEffect(() => { listProducts() }, [])

  return (
    <ProductContext.Provider value={{ products, listProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
