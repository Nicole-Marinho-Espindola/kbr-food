import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text , Image, TextInput, TouchableOpacity} from "react-native";
import Button from "~/components/form/Button";
import Stars from "~/components/ui/Stars";
import { useProduct } from "~/contexts/ProductsContext";

export default function DetailsScreen() {
    const [qtd, setQtd] = useState(1);
    const [product, setProduct] = useState<any>(null);
    const { getProductById } = useProduct();
    const route = useRoute();
    const { productId } = route.params as { productId: number };

    const handleGetProduct = async () => {
        const productData = await getProductById(productId);
        setProduct(productData);
    }

    const handleAddCart = () =>{
        console.log("adding to cart");
    }

    useEffect(() => {
        handleGetProduct();
    }, [])

    return(
        <View className="p-5">
            {
                product && (
                    <>
                        <View className="h-[20em] w-full rounded-xl bg-lightGray mr-4 overflow-hidden">
                            <Image source={{uri: product.imagem}} className="h-full w-full object-contain" />
                        </View>
                        <View className="flex justify-between items-center flex-row my-5 w-[80%]">
                            <Text className="text-[24px] text-darkPink font-bold">{product.nome}</Text>
                        </View>
                        <View className="mt-5 gap-6">
                            <Text className="text-[18px]">Descrição</Text>
                            <Text className="text-[#a7a7a7] text-[20px]">{product.descricao}</Text>
                            <Text className="text-[18px]">Alguma observação?</Text>
                            <TextInput
                                className="border border-gray-300 rounded-xl min-h-[3em] max-h-[5em] h-auto p-5 text-[20px] overflow-y-scroll"
                                multiline={true} 
                                numberOfLines={4} 
                                placeholder="Retirar cebola..."
                                textAlignVertical="top" 
                            />
                            <View className="flex justify-center items-center flex-row w-full gap-3">
                                <View className="flex justify-center items-center flex-row">
                                    <TextInput className="bg-darkPink/10 h-10 w-10 rounded text-darkPink flex justify-center items-center text-[24px]">-</TextInput>
                                    <Text className="bg-gray-100 text-[24px] h-10 w-10 flex justify-center items-center">{qtd}</Text>
                                    <TextInput className="bg-darkPink/10 h-10 w-10 rounded text-darkPink flex justify-center items-center text-[24px]">+</TextInput>
                                </View>
                                <TouchableOpacity
                                    onPress={handleAddCart}
                                    className={` w-2/3 bg-orange h-14 rounded-lg flex flex-row justify-between items-center px-5`}
                                >
                                    <Text className={` text-[20px] font-light text-[#ffcaa4]`}>Adicionar</Text>
                                    <Text className={` text-[20px] font-light text-white`}>{product.preco}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )
            }
        </View>
    )
}
