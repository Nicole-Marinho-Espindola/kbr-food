import { ShoppingBag, Star } from "lucide-react-native";
import { View, Text, Image } from "react-native";

export function Food() {
  return(
    <View className="flex justify-center items-center flex-col bg-white rounded-xl p-5 max-h-[11em] my-2">
      <View className="flex flex-row mb-2 justify-start w-full">
          <Star size={20} color="#F3752B" />
          <Star size={20} color="#F3752B" />
          <Star size={20} color="#F3752B" />
          <Star size={20} color="#EDEDF4" />
          <Star size={20} color="#EDEDF4" />
      </View>
      <View className="flex justify-start items-center flex-row">
        <View className="h-[100px] w-[100px] rounded-xl bg-lightGray mr-4 overflow-hidden">
            <Image source={require('../../../../assets/food.png')} className="h-full w-full object-contain" />
        </View>
        <View className="flex justify-start items-center h-full">
          <Text className="text-[22px] max-w-[10em]">Frango empanado c/ Coca 2l e sobremesa</Text>
          <View className="flex justify-start items-end flex-row mt-6 w-full">
            <Text className="text-green-600 text-[18px] mr-3">R$ 30,50</Text>
            <ShoppingBag size={20} color="#A20021" />
          </View>
        </View>
      </View>
    </View>
  )
}

export default function Promotions() {
    return(
        <View className="flex justify-center items-center px-6 pt-10">
            <Text className="text-[30px] font-bold text-white">Promoção</Text>
            <View>
              <Food />
            </View>
        </View>
    )
}