import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Heart, PackageSearch } from "lucide-react-native";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Food } from "~/components/ui/Food";
import { useFavorites } from "~/contexts/FavoriteContext";
import { useProduct } from "~/contexts/ProductsContext";
import { HeartOff } from "lucide-react-native";

export default function FavoritesScreen() {
    const navigation = useNavigation<any>();
    const { favorites } = useFavorites();
    const { products } = useProduct();

    const favoriteProducts = products.filter(p =>
        favorites.includes(p.id)
    );

    return (
        <View className="p-5 w-full h-full">
            {favoriteProducts.length > 0 ? (
                <>
                    <View className="flex justify-start items-center flex-row w-full gap-3.5 mt-2">
                    <Heart size={24} color="#A20021" />
                    <Text className="text-[25px] font-light">Produtos favoritados</Text>
                    </View>

                    <View className="mt-10 gap-3">
                    {favoriteProducts.map((fav) => (
                        <Food
                        key={fav.id}
                        id={fav.id}
                        img={fav.imagem}
                        price={fav.preco}
                        desc={fav.nome}
                        onPress={() =>
                            navigation.navigate("Details", { productId: fav.id })
                        }
                        isFavorited={true}
                        />
                    ))}
                    </View>
                </>
            ) : (
            <View className="flex justify-center items-center h-full w-full gap-5">
                <HeartOff size={70} color="#F3752B" />
                <Text className="text-[20px]">Nenhum favorito por aqui ainda!</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                    className="bg-pink px-5 py-3 rounded"
                >
                <Text className="text-white text-[18px]">Voltar para as compras</Text>
                </TouchableOpacity>
            </View>
            )}
        </View>
    );
}