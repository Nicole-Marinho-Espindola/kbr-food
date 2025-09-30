import { useState } from "react";
import { View, Text , Image, TextInput} from "react-native";
import Button from "~/components/form/Button";
import Stars from "~/components/ui/Stars";

export default function DetailsScreen() {
    const [text, setText] = useState();

    const newText = "texto";

    const handleAddCart = () =>{
        console.log("adding to cart")
    }

    return(
        <View className="p-5">
            <View className="flex w-full justify-between items-center flex-row mb-5">
                <Stars />
                <Text className="text-[24px] text-green-500">R$ 25,90</Text>
            </View>
            <View className="h-[20em] w-full rounded-xl bg-lightGray mr-4 overflow-hidden">
                <Image source={require('../../../assets/food.png')} className="h-full w-full object-contain" />
            </View>
            <View className="mt-5 gap-5">
                <Text className="text-[24px]">Descrição</Text>
                <Text className="text-[#8d8d8d] text-[20px]">Frango empanado com coca cola e sobremesa</Text>
                <Text className="text-[24px]">Alguma observação?</Text>
                <TextInput
                    className="border border-gray-400 rounded-xl h-[8em] p-5 text-[20px] overflow-y-scroll"
                    multiline={true} 
                    numberOfLines={4} 
                    value={text}
                    placeholder="Retirar cebola..."
                    textAlignVertical="top" 
                />
                <View className="flex justify-center items-center flex-row w-full gap-3">
                    <View className="flex justify-center items-center flex-row">
                        <TextInput className="bg-darkPink/10 h-10 w-10 rounded text-darkPink flex justify-center items-center text-[24px]">-</TextInput>
                        <Text className="bg-gray-100 text-[24px] h-10 w-10 flex justify-center items-center">2</Text>
                        <TextInput className="bg-darkPink/10 h-10 w-10 rounded text-darkPink flex justify-center items-center text-[24px]">+</TextInput>
                    </View>
                    <Button title="Adicionar ao carrinho" onPress={() => handleAddCart()} className="!w-2/3" />
                </View>
            </View>
        </View>
    )
}