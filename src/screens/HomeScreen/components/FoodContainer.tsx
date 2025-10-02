import { useNavigation, useRoute } from "@react-navigation/native";
import { Filter } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View , Text, Image, TouchableOpacity} from "react-native";
import { api } from "~/api/api";
import SearchProducts from "~/components/ui/SearchProducts";
import Stars from "~/components/ui/Stars";
import { useProduct } from "~/contexts/ProductsContext";

export function Food({onPress, desc, img, price}: {onPress: () => void, desc:string, img: string, price:number | string}) {
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-row p-4 w-full rounded-xl bg-white">
            <View className="h-[80px] w-[80px] rounded-xl bg-lightGray mr-4 overflow-hidden">
                <Image source={{ uri: `${api}/${img}` }} className="h-full w-full object-contain" />
            </View>
            <View>
                <View className="flex flex-row justify-between">
                    <Stars />
                    <Text className="text-[18px] text-darkGray font-bold">R$ {price}</Text>
                </View>
                <View className="w-[250px]">
                    <Text className="text-[18px] text-lightGray">
                        {desc}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default function FoodContainer() {
    const navigation = useNavigation<any>();
    const { products, listProducts } = useProduct();

    useEffect(() => {
        listProducts();
    }, []);

    return(
       <View className="p-5 gap-4 w-full">
            <View className="flex justify-between items-center flex-row mb-4 gap-1">
                <View className="w-[85%]">
                    <SearchProducts />
                </View>
                <View className="bg-white p-2 rounded">
                    <Filter size={30} color="#F3752B" />
                </View>
            </View>
            {
                products?.map(product => (
                    <Food 
                        key={product.id}
                        img={product.imagem}
                        price={product.preco}
                        desc={product.descricao} 
                        onPress={() => navigation.navigate('Details')} 
                    />
                ))
            }
        </View>
    )
}