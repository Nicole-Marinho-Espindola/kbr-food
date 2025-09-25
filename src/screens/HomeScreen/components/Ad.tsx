import { View , Text} from "react-native";

export default function Ad() {
    return(
        <View className="px-5 pt-2 w-full">
            <View className="w-full h-32 bg-black rounded-xl mt-10 flex justify-center items-center">
                <Text className="text-white text-[20px] font-bold">Ad Component</Text>
            </View>
        </View>
    )
}