import { SearchIcon, SearchX, Star } from "lucide-react-native";
import { useState } from "react";
import { View, Text, TextInput , Image} from "react-native";
import Categorie from "~/components/ui/Categorie";

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
            <View className="relative flex justify-center items-center h-[45px] rounded flex-row bg-white w-full">
                <TextInput
                    value={text}
                    onChangeText={newText => setText(newText)}
                    className="w-full px-3 text-[18px]"
                />
                <View className="absolute right-3">
                    <SearchIcon size={30} color="#F52F57" />
                </View>
            </View>
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