import { useState } from "react";
import { View, Text , Image} from "react-native";
import SearchProducts from "~/components/ui/SearchProducts";

export function SearchCategorie({name,img}:{name:string,img?:any}) {
    return(
        <View className="flex flex-row  justify-between  bg-orange rounded-xl w-full h-[80px] relative overflow-hidden">
            <Text className="font-semibold text-white text-[24px] p-5">{name}</Text>
            <Image source={img} className="h-8/10 w-1/3 bg-darkPink object-contain" />
        </View>
    )
}

export default function Search() {
    const [text, setText] = useState('');

    return(
        <View className="flex justify-center items-center p-5">
            <SearchProducts />
            <Text className="my-10 text-gray-400 text-[20px]">Ou escolha por categoria</Text>
            <View className="flex flex-row flex-wrap justify-between w-full gap-3">
                <SearchCategorie name="Food" />
                <SearchCategorie name="Food" />
                <SearchCategorie name="Food" />
                <SearchCategorie name="Food" />
                <SearchCategorie name="Food" />
                <SearchCategorie name="Food" />
            </View>
            
        </View>
    )
}