import {  Menu, Search } from "lucide-react-native";
import { useState } from "react";
import { View, TextInput, TouchableOpacity , Text} from "react-native";

export default function NavBar() {
    const [text, setText] = useState('');
    
    return(
        <View className="px-5">
            <View className="relative flex justify-between items-center flex-row w-full">
                <TouchableOpacity onPress={() => {}}>
                    <Menu size={34} color="#F52F57"/>
                </TouchableOpacity>
                <View className="relative flex justify-center items-center h-[35px] rounded flex-row bg-[#FFF9F5] w-[80%]">
                    <TextInput
                        value={text}
                        onChangeText={newText => setText(newText)}
                        className="w-full px-3 text-[18px]"
                    />
                    <View className="absolute right-3">
                        <Search size={34} color="#F52F57"/>   
                    </View>
                </View>
            </View>
        </View>
    )
}