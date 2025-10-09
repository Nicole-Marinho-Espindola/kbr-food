import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Food {
  id: number;
  name: string;
  image: string;
}

interface FavoritesContextType {
  favorites: number[];
  handleListFavorites: () => Promise<void>;
  handleAddFavorite: (id: number) => Promise<void>;
  handleRemoveFavorite: (id: number) => Promise<void>;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({} as FavoritesContextType);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleListFavorites = async () => {
    const stored = await AsyncStorage.getItem("@favorites");
    if (stored) setFavorites(JSON.parse(stored));
  };

  const handleAddFavorite = async (id: number) => {
    const updated = [...favorites, id];
    setFavorites(updated);
    await AsyncStorage.setItem("@favorites", JSON.stringify(updated));
  };

  const handleRemoveFavorite = async (id: number) => {
    const updated = favorites.filter(f => f !== id);
    setFavorites(updated);
    await AsyncStorage.setItem("@favorites", JSON.stringify(updated));
  };

  const isFavorite = (id: number) => favorites.includes(id);

  useEffect(() => {
    handleListFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, handleListFavorites, handleAddFavorite, handleRemoveFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
