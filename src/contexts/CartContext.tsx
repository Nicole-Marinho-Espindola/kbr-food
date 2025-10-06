import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    total: number;
}

type CartContextType = {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qtd: number) => void;
  clearCart: () => void;
  totalValue: number;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children } : { children: React.ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (item: Product) => { 
      setCart((prev) => {
        const existing = prev.find((p) => p.id === item.id);
        if (existing) {
          return prev.map((p) =>
            p.id === item.id
              ? { ...p, qtd: p.quantity + item.quantity, total: (p.quantity + item.quantity) * p.price }
              : p
          );
        }
        return [...prev, item];
      });
    }
    
    const removeFromCart = (id: number) => { 
      setCart((prev) => prev.filter((p) => p.id !== id));
    }

    const updateQuantity = (id: number, qtd: number ) => { 
      setCart((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, qtd, total: qtd * p.price } : p
        )
      );
    }

    const totalValue = cart.reduce((acc, item) => acc + item.total, 0);

    const clearCart = () => {
      setCart([]);
    };

    useEffect(() => {
      AsyncStorage.setItem("@cart", JSON.stringify(cart));
    }, [cart]);


    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, updateQuantity, totalValue }}>
          {children}
        </CartContext.Provider>
    );
}

export function useCart() {
  return useContext(CartContext);
}