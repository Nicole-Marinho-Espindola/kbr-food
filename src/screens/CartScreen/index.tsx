import { View, Text } from "react-native";
import Button from "~/components/form/Button";
import Combo from "~/components/ui/Combo";

export default function CartScreen() {

    const handleFinish = () => {
        console.log("teste")
    }

    return(
        <View className="flex justify-between items-center h-screen">
            <View className="flex justify-center items-start px-8 w-full mt-5">
                <Text className="font-light text-[25px]">Items adicionados:</Text>
                <View className="max-h-[30em] overflow-y-scroll w-full flex justify-start items-center mt-5 rounded-xl">
                    <Combo text="2 Temaki Philadelphia!" price="R$ 37,39" />
                    <Combo text="2 Temaki Philadelphia!" price="R$ 37,39" />
                    <Combo text="2 Temaki Philadelphia!" price="R$ 37,39" />
                    <Combo text="2 Temaki Philadelphia!" price="R$ 37,39" />
                    <Combo text="2 Temaki Philadelphia!" price="R$ 37,39" />
                </View>
            </View>
            <View className="h-[28em] bg-darkPink flex justify-start items-center p-5 w-full pt-10 rounded-tl-[90px]">
               <View className="flex justify-center items-center flex-col w-full p-5 mb-5">
                    <View className="flex justify-between items-center flex-row w-full my-1.5">
                        <Text className="font-bold text-white text-[22px]">Subtotal</Text>
                        <Text className="text-white text-[20px]">R$ 258,37</Text>
                    </View>
                    <View className="flex justify-between items-center flex-row w-full my-1.5">
                        <Text className="font-bold text-white text-[22px]">Descontos</Text>
                        <Text className="text-white text-[20px]">R$ 58,37</Text>
                    </View>
                    <View className="flex justify-between items-center flex-row w-full my-1.5">
                        <Text className="font-bold text-white text-[22px]">Total</Text>
                        <Text className="text-white text-[20px]">R$ 200,00</Text>
                    </View>
               </View>
                <Button title="Finalizar pedido" onPress={() => handleFinish()}/>
            </View>
        </View>
    )
}