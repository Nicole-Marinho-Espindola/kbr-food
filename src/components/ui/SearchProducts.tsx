import { SearchIcon } from "lucide-react-native";
import { useState } from "react";
import { View, TextInput } from "react-native";

export default function SearchProducts({onChangeText, value} : {onChangeText: (text: string) => void, value: string}) {
    const [text, setText] = useState('');
    return(
        <View className="relative flex justify-center items-center h-[45px] rounded flex-row bg-white w-full">
            <TextInput
                placeholder="Buscar produto..."
                value={value}
                onChangeText={onChangeText}
                className="w-full px-3 text-[18px]"
            />
            <View className="absolute right-3">
                <SearchIcon size={30} color="#F52F57" />
            </View>
        </View>
    )
}