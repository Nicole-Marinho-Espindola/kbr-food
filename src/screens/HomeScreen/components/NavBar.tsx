import {  Bell } from "lucide-react-native";
import { useState } from "react";
import { View, TextInput, TouchableOpacity , Text} from "react-native";

export default function NavBar() {
    const [text, setText] = useState('');
    
    return(
        <View className="px-5 mt-5 w-full">
            <View className="relative flex justify-start items-center flex-row w-full">
                <TouchableOpacity onPress={() => {}} className="mr-8">
                    <Bell size={34} color="#F52F57"/>
                </TouchableOpacity>
                <View className="relative flex justify-center items-center h-[35px] rounded flex-row">
                    <Text className="font-semibold">Av. Diamantino Cruz Ferreira Mourão, 8896...</Text>
                </View>
            </View>
        </View>
    )
}