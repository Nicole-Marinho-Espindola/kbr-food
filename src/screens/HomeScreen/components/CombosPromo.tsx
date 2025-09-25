import { View, Text, Image } from "react-native";
import Combo from "~/components/ui/Combo";

export default function CombosPromo() {
    return(
        <View className="flex justify-center items-start w-full px-6 pt-10 my-10">
            <Text className="text-[30px] font-bold mb-5">Combos</Text>
            <View className="flex justify-start items-center flex-row">
                <View className="rounded-xl flex justify-center items-center w-fit">
                    <Combo img={require('../../../../assets/food.png')}  text="2 Temaki Philadelphia!" price="R$ 37,39" />
                    <Combo img={require('../../../../assets/food.png')}  text="2 Temaki Philadelphia!" price="R$ 37,39" />
                </View>
                <View className="rounded-xl flex justify-center items-center w-fit">
                    <Combo img={require('../../../../assets/food.png')}  text="2 Temaki Philadelphia!" price="R$ 37,39" />
                    <Combo img={require('../../../../assets/food.png')}  text="2 Temaki Philadelphia!" price="R$ 37,39" />
                </View>
            </View>
            <View className="flex justify-center items-center flex-row w-full mt-5">
                <View className="h-1.5 w-6 bg-pink"></View> 
                <View className="h-1.5 w-6 bg-gray-300 mx-2"></View> 
                <View className="h-1.5 w-6 bg-gray-300"></View> 
            </View>
        </View>
    )
}