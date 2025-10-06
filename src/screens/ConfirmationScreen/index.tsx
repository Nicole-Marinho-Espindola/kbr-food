import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Button from "~/components/form/Button";
import TabButtons from "~/components/TabButtons";

export function ConfirmationItem() {
    return(
        <View className="bg-white w-full p-4 rounded-xl flex justify-start items-start flex-col">
            <Text className="text-darkPink font-semibold">Lanche do netão</Text>
            <View className="flex justify-between items-center flex-row w-full my-2">
                <Text className="text-green-600">59,70</Text>
                <Text>x2</Text>
            </View>
            <Text className="text-gray-400">Retirar cebola</Text>
        </View>
    )
}

export default function ConfirmationScreen() {
    const Location = AsyncStorage.getItem("user_address");

    return(
        <View className="p-5 flex justify-start items-center h-screen w-full gap-5">
            <View className="mt-14">
                <Text className="font-light text-[25px] mb-3">Confirmar pedido:</Text>
                <ScrollView
                    className="w-full max-h-[15em] bg-orange/20 rounded-xl p-3"
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ paddingBottom: 20, gap: 10, }}
                >
                    <ConfirmationItem />
                    <ConfirmationItem />
                    <ConfirmationItem />
                </ScrollView>
            </View>
            <View className="w-full mb-5">
                <Text className="font-light text-[25px] mb-4">Confirmar endereço:</Text>
                <View className="flex justify-center items-center w-full">
                    <View className="w-full mb-4">
                        <Text className="text-darkPink">Número:</Text>
                        <TextInput className="border-b border-darkPink px-2 py-3 w-full" placeholder="Digitar número..."></TextInput>
                    </View>
                    <View className="w-full">
                        <Text className="text-darkPink">Endereço <Text className="text-gray-500">(editável)</Text>:</Text>
                        <TextInput className="border-b border-darkPink px-2 py-3 w-full" placeholder="Digitar endereço...">{Location}</TextInput>
                    </View>
                </View>
            </View>
            <View className="w-full mb-5">
                <Text className="font-light text-[25px] mb-3">Forma de pagamento:</Text>
                <View className="w-full">
                    <TouchableOpacity className="border border-darkPink/20 rounded-xl p-3 mb-2">
                        <Text>Dinheiro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border border-darkPink/20 rounded-xl p-3 mb-2">
                        <Text>Pix</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex justify-center items-center gap-3 flex-row">
                <Text className="text-[24px]">Total:</Text>
                <Text className="text-[24px] text-green-600">R$ 250,70</Text>
            </View>
            <Button title="Finalizar pedido" onPress={() => {}}/>
            <TabButtons />
        </View>
    )
}