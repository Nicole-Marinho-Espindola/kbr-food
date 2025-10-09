import { useNavigation } from "@react-navigation/native";
import { ShoppingBag } from "lucide-react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Stars from "~/components/ui/Stars";
import { useProduct } from "~/contexts/ProductsContext";

function Food({desc, price, img}: {desc:string, price:number, img:string}) {
  return(
    <View className="flex justify-center items-center flex-col bg-white rounded-xl p-5 max-h-[11em] my-2">
      <View className="flex justify-start items-center w-full flex-row">
        <Stars />
      </View>
      <View className="flex justify-start items-center flex-row">
        <View className="h-[100px] w-[100px] rounded-xl bg-lightGray mr-4 overflow-hidden">
            <Image source={{uri: img}} className="h-full w-full object-contain" />
        </View>
        <View className="flex justify-start items-center h-full">
          <Text className="text-[22px] max-w-[10em]">{desc}</Text>
          <View className="flex justify-start items-end flex-row mt-6 w-full">
            <Text className="text-green-600 text-[18px] mr-3">R$ {price}</Text>
            <ShoppingBag size={20} color="#A20021" />
          </View>
        </View>
      </View>
    </View>
  )
}

export default function Promotions() {
  const navigation = useNavigation<any>();
  const { products } = useProduct();
  const cheapest = products.reduce((prev, curr) => prev.preco < curr.preco ? prev : curr, products[0]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { productId: cheapest.id})} className="flex justify-center items-center px-6 pt-10">
      <Text className="text-[30px] font-bold text-white">Promoção</Text>
      <View>
        {cheapest && <Food desc={cheapest.descricao} price={cheapest.preco} img={cheapest.imagem} />}
      </View>
    </TouchableOpacity>
  );
}