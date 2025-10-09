import { View, Text,ScrollView } from "react-native";
import TabButtons from "~/components/TabButtons";
import {FileClock } from "lucide-react-native"

export function OldOrder() {
    return(
        <View className="bg-white w-full min-h-[100px] p-4 rounded-xl flex justify-start items-start flex-col my-2">
            <Text className="text-darkPink font-semibold">Pedido #12345</Text>
            <View className="flex justify-between items-center flex-row w-full my-2">
                <Text className="text-green-600">R$ 59.90</Text>
                <Text>x2</Text>
            </View>
            <Text className="text-gray-400">Entregue em 20/08/2023</Text>
        </View>
    )
}

export default function OrdersScreen() {
    return(
        <View className="p-5 h-screen">
            <View className="flex justify-start items-center flex-row w-full gap-3.5">
                <FileClock size={24} color="#A20021" />
                <Text className="mt-14 text-[25px] font-light">Historico de pedidos</Text>
            </View>
            <ScrollView className="mt-8 max-h-[45em]">
                <OldOrder />
                <OldOrder />
                <OldOrder />
                <OldOrder />
                <OldOrder />
                <OldOrder />
                <OldOrder />
                <OldOrder />
                <OldOrder />
                <OldOrder />
            </ScrollView>
            <View className="flex-1 justify-center items-center w-full">
                <TabButtons />
            </View>
        </View>
    )
}