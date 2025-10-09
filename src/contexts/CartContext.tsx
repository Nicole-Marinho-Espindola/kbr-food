import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type Product = {
    id: number;
    title: string;
    description?: string;
    price: number;
    image: string;
    quantity: number;
    total: number;
}

type Order = {
    id: number;
    title: string;
    description?: string;
    price: number;
    image: string;
    quantity: number;
    total: number;
    address: string;
    number: string;
    paymentMethod: string;
}

type CartContextType = {
  cart: Product[];
  addToCart: (item: Product) => void;
  handlePlaceOrder: (item: Order) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qtd: number) => void;
  clearCart: () => void;
  totalValue: number;
  pedidosAntigos: Order[];
  cartCount: number;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children } : { children: React.ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);
    const [pedidosAntigos, setPedidosAntigos] = useState<Order[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);

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

    const handlePlaceOrder = async (novoPedido: Order) => {
      try {
        const pedidosAtualizados = [novoPedido, ...pedidosAntigos];
        await AsyncStorage.setItem("pedidos_antigos", JSON.stringify(pedidosAtualizados));
        setPedidosAntigos(pedidosAtualizados);
        setCart([]);
        console.log("Pedido salvo com sucesso! 🚀");
      } catch (error) {
        console.error("Erro ao salvar pedido:", error);
      }
    };

    const totalValue = cart.reduce((acc, item) => acc + item.total, 0);

    const clearCart = () => {
      setCart([]);
    };

    useEffect(() => {
      AsyncStorage.setItem("@cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
      (async () => {
        const storedOrders = await AsyncStorage.getItem("pedidos_antigos");
        if (storedOrders) setPedidosAntigos(JSON.parse(storedOrders));
      })();
    }, []);

    useEffect(() => {
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
      AsyncStorage.setItem("@cart_count", count.toString());
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, updateQuantity, totalValue, handlePlaceOrder, pedidosAntigos, cartCount }}>
          {children}
        </CartContext.Provider>
    );
}

export function useCart() {
  return useContext(CartContext);
}