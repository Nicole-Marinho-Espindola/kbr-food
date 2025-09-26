import { useNavigation, useRoute } from "@react-navigation/native";
import { View , Text, Image, TouchableOpacity} from "react-native";
import Stars from "~/components/ui/Stars";

export function Food({onPress}: {onPress: () => void}) {
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-row p-4 w-full rounded-xl bg-white">
            <View className="h-[80px] w-[80px] rounded-xl bg-lightGray mr-4 overflow-hidden">
                <Image source={require('../../../../assets/food.png')} className="h-full w-full object-contain" />
            </View>
            <View>
                <View className="flex flex-row justify-between">
                    <Stars />
                    <Text className="text-[18px] text-darkGray font-bold">R$ 25,30</Text>
                </View>
                <View className="w-[250px]">
                    <Text className="text-[20px] text-lightGray">
                        Frango empanado com batata frita
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default function FoodContainer() {
    const navigation = useNavigation<any>();

    return(
       <View className="px-6 pt-10 gap-4 w-full">
            <Food onPress={() => navigation.navigate('Details')} />
            <Food onPress={() => navigation.navigate('Details')} />
            <Food onPress={() => navigation.navigate('Details')} />
            <Food onPress={() => navigation.navigate('Details')} />
            <Food onPress={() => navigation.navigate('Details')} />
        </View>
    )
}