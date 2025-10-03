import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "~/api/categories";
import { getProductId, getProducts } from "~/api/products";

interface Product {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  categoriaID: number;
  categoriaNome: string;
  descricao: string;
}

interface Categorie {
  id: number;
  nome: string;
  corHex: string;
  imagem: string;
}

interface ProductContextProps {
  products: Product[];
  product: Product | null;
  categories: Categorie[];
  listProducts: () => Promise<void>;
  listCategories: () => Promise<void>;
  getProductById: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextProps>({} as ProductContextProps);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);

  async function listProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao listar produtos", error);
    }
  }

  async function getProductById(id: number) {
    try {
      const response = await getProductId(id); 
      setProduct(response);
      return response;
    } catch (error) {
      console.error("Erro ao buscar produto por ID", error);
    }
  }

  async function listCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao listar categorias", error);
    }
  }

  useEffect(() => {
    listProducts();
    listCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, listProducts, listCategories, categories, product, getProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
