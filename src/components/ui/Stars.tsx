import { Star } from "lucide-react-native";
import { View } from "react-native";

export default function Stars() {
    return(
        <View className="flex flex-row mb-2 justify-between w-[100px]">
            <Star size={16} color="#F3752B" />
            <Star size={16} color="#F3752B" />
            <Star size={16} color="#F3752B" />
            <Star size={16} color="#EDEDF4" />
            <Star size={16} color="#EDEDF4" />
        </View>
    )
}