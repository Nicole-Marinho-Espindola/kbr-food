import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text , Image, TextInput, TouchableOpacity} from "react-native";
import { useCart } from "~/contexts/CartContext";
import { useProduct } from "~/contexts/ProductsContext";

export default function DetailsScreen() {
    const [qtd, setQtd] = useState(1);
    const [product, setProduct] = useState<any>(null);
    const [finalValue, setFinalValue] = useState<any>(null);
    const { getProductById } = useProduct();

    const navigation = useNavigation<any>();
    const route = useRoute();
    const { productId } = route.params as { productId: number };

    const { addToCart } = useCart();

    const handleGetProduct = async () => {
        const productData = await getProductById(productId);
        setProduct(productData);
    }

    const handleAddCart = () => {
        const newItem = {
            id: product.id,
            title: product.nome,
            price: product.preco,
            image: product.imagem,
            quantity: qtd,
            total: finalValue,
        }

        addToCart(newItem);
        navigation.navigate("Cart");
    }

    useEffect(() => {
        if (product) {
            const newQuantity = product.preco * qtd;
            setFinalValue(newQuantity);
        }
    }, [product, qtd]);

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
                                    <TouchableOpacity 
                                        onPress={() => setQtd(prev => Math.max(prev - 1, 1))} 
                                        className="bg-darkPink/10 h-10 w-10 rounded text-darkPink flex justify-center items-center text-[24px]"
                                    >
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                    <View className="bg-gray-100 text-[24px] h-10 w-10 flex justify-center items-center">
                                        <Text className="text-darkPink text-[20px] font-bold">{qtd}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => setQtd(prev => prev + 1)} 
                                        className="bg-darkPink/10 h-10 w-10 rounded text-darkPink flex justify-center items-center text-[24px]"
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={handleAddCart}
                                    className={` w-2/3 bg-orange h-14 rounded-lg flex flex-row justify-between items-center px-5`}
                                >
                                    <Text className={` text-[20px] font-light text-[#ffcaa4]`}>Adicionar</Text>
                                    <Text className={` text-[20px] font-light text-white`}>{finalValue}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )
            }
        </View>
    )
}
