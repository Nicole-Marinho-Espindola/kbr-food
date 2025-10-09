import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Heart } from "lucide-react-native";
import { useState } from "react";
import { View, Text } from "react-native";
import { Food } from "~/components/ui/Food";
import { useFavorites } from "~/contexts/FavoriteContext";
import { useProduct } from "~/contexts/ProductsContext";

export default function FavoritesScreen() {
    const navigation = useNavigation<any>();
    const { favorites } = useFavorites();
    const { products } = useProduct();

    const favoriteProducts = products.filter(p =>
        favorites.includes(p.id)
    );

    return(
        <View className="p-5 w-full h-full">
            <View className="flex justify-start items-center flex-row w-full gap-3.5 mt-2">
                <Heart size={24} color="#A20021" />
                <Text className="text-[25px] font-light">Produtos favoritados</Text>
            </View>
            <View className="mt-10 gap-3">
                {
                    favoriteProducts.length > 0 ?
                        favoriteProducts.map(fav => (
                            <Food 
                                key={fav.id}
                                id={fav.id}
                                img={fav.imagem}
                                price={fav.preco}
                                desc={fav.nome} 
                                onPress={() => navigation.navigate('Details', { productId: fav.id})} 
                                isFavorited={true}
                            />
                        )
                    ) : (
                        <View className="flex justify-center items-center">
                            <Text className="text-[18px] text-gray-500 mt-10">Você não possui produtos favoritados.</Text>
                        </View>
                    )
                }
            </View>
        </View>
    )
}