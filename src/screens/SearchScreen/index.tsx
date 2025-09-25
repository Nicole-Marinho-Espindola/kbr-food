import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export default function Search() {
    const [text, setText] = useState('');

    return(
        <View className="flex-1 justify-center items-center">
            <View className="relative flex justify-center items-center h-[35px] rounded flex-row bg-[#FFF9F5] w-[80%]">
                <TextInput
                    value={text}
                    onChangeText={newText => setText(newText)}
                    className="w-full px-3 text-[18px]"
                />
                <View className="absolute right-3">
                    {/* <Search size={34} color="#F52F57"/>    */}
                </View>
            </View>
        </View>
    )
}