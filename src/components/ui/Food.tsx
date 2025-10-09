import { Heart } from "lucide-react-native";
import { TouchableOpacity, View, Image , Text} from "react-native";
import { api } from "~/api/api";
import Stars from "./Stars";
import { useState } from "react";
import { useFavorites } from "~/contexts/FavoriteContext";

export function Food({id, onPress, desc, img, price, isFavorited}: {id:number, onPress: () => void, desc:string, img: string, price:number | string, isFavorited?: boolean}) {
    const [favorited, setFavorited] = useState(isFavorited);
    const { handleAddFavorite, handleRemoveFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(id); 

    const handleToggleFavorite = () => {
    if (favorite) handleRemoveFavorite(id);
    else handleAddFavorite(id);
    };

    return (
        <TouchableOpacity onPress={onPress} className="flex flex-row p-4 w-full rounded-xl bg-white h-[8em]">
            <View className="h-full w-[80px] rounded-xl bg-lightGray mr-4 overflow-hidden">
                <Image source={{ uri: img }} className="h-full w-full object-contain" />
            </View>
            <View>
                <View className="flex flex-row justify-between">
                    <Stars />
                    <TouchableOpacity onPress={handleToggleFavorite}>
                        <Heart size={24} color={favorite ? "#F52F57" : "#EDEDF4"} fill={favorite ? "#F52F57" : "none"} />
                    </TouchableOpacity>
                </View>
                <View className="w-[250px] gap-3">
                    <Text className="text-[18px] text-lightGray">
                        {desc}
                    </Text>
                    <Text className="text-[18px] text-darkGray font-semibold text-green-600">R$ {price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}