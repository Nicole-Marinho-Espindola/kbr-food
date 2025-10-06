import { Heart } from "lucide-react-native";
import { TouchableOpacity, View, Image , Text} from "react-native";
import { api } from "~/api/api";
import Stars from "./Stars";

export function Food({onPress, desc, img, price}: {onPress: () => void, desc:string, img: string, price:number | string}) {
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-row p-4 w-full rounded-xl bg-white h-[8em]">
            <View className="h-full w-[80px] rounded-xl bg-lightGray mr-4 overflow-hidden">
                <Image source={{ uri: `${api}/${img}` }} className="h-full w-full object-contain" />
            </View>
            <View>
                <View className="flex flex-row justify-between">
                    <Stars />
                    <Heart size={24} color="#F3752B" />
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