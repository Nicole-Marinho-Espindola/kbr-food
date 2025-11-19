import { useNavigation } from "@react-navigation/native";
import { ShoppingBag, ShoppingBasket, Trash } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "~/components/form/Button";
import TabButtons from "~/components/TabButtons";
import { useCart } from "~/contexts/CartContext";

export function CartItem({id, img, text, price, quantity}: {img?:any, text:string, price:string, id: number, quantity: number}) {
    const [qtd, setQtd] = useState(quantity);
    const {removeFromCart, updateQuantity} = useCart();
    
    return(
        <View className="flex justify-between items-center flex-row w-full p-3 bg-white rounded-xl max-h-[8em]">
            <View className="h-full w-[25%] rounded-xl bg-lightGray mr-4 overflow-hidden">
                <Image source={img} className="h-full w-full object-contain" />
            </View>
            <View className="flex justify-center items-start mt-2 gap-2 w-[70%]">
                <Text className="text-[18px]">{text}</Text>
                <Text className="text-green-500 text-[18px]">{price}</Text>
                <View className="flex justify-between items-center flex-row w-full">
                    <View className="flex justify-center items-center flex-row">
                        <TouchableOpacity 
                            onPress={() => {
                                const newQtd = Math.max(qtd - 1, 1);
                                setQtd(newQtd);
                                updateQuantity(id, newQtd); 
                            }} 
                            className="bg-darkPink/10 h-7 w-10 rounded text-darkPink flex justify-center items-center text-[24px]"
                        >
                            <Text>-</Text>
                        </TouchableOpacity>

                        <View className="bg-gray-100 text-[24px] h-7 w-10 flex justify-center items-center">
                            <Text className="text-darkPink text-[20px] font-bold">{qtd}</Text>
                        </View>

                        <TouchableOpacity 
                            onPress={() => {
                                const newQtd = qtd + 1;
                                setQtd(newQtd);
                                updateQuantity(id, newQtd); 
                            }} 
                            className="bg-darkPink/10 h-7 w-10 rounded text-darkPink flex justify-center items-center text-[24px]"
                        >
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(id)} className="ml-6">
                        <Trash color="red" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default function CartScreen() {
  const { cart, clearCart, totalValue } = useCart();
  const navigation = useNavigation<any>();
  const shipping = 5.30;
  const finalValue = totalValue + shipping;

  return (
        <SafeAreaView className="flex-1 bg-white">
        {cart.length > 0 ? (
            <>
            <View className="flex-1 px-5 pt-5">
                <ScrollView
                className="w-full"
                contentContainerStyle={{
                    paddingBottom: 20,
                    gap: 10,
                }}
                >
                {cart.map(item => (
                    <CartItem
                    key={item.id}
                    id={item.id}
                    img={{ uri: item.image }}
                    text={item.title}
                    quantity={item.quantity}
                    price={`R$ ${item.total.toFixed(2)}`}
                    />
                ))}
                </ScrollView>

                <View className="w-full flex-row justify-between items-center my-5">
                <Text>
                    Frete fixo de <Text className="text-darkPink">R$ 5,30</Text>
                </Text>
                {cart.length > 0 && (
                    <TouchableOpacity
                    onPress={clearCart}
                    className="flex-row items-center border-b border-pink p-1"
                    >
                    <Text className="text-darkPink mr-2">Limpar Carrinho</Text>
                    <Trash color="red" size={20} />
                    </TouchableOpacity>
                )}
                </View>
            </View>

            <View className="bg-darkPink p-5 rounded-tl-[90px]">
                <View className="w-full p-5">
                <View className="flex-row justify-between my-1.5">
                    <Text className="font-bold text-white text-[22px]">Subtotal</Text>
                    <Text className="text-white text-[20px]">R$ {totalValue.toFixed(2)}</Text>
                </View>

                <View className="flex-row justify-between my-1.5">
                    <Text className="font-bold text-white text-[22px]">Frete</Text>
                    <Text className="text-white text-[20px]">R$ {shipping.toFixed(2)}</Text>
                </View>

                <View className="flex-row justify-between my-1.5">
                    <Text className="font-bold text-white text-[22px]">Total</Text>
                    <Text className="text-white text-[20px]">R$ {finalValue.toFixed(2)}</Text>
                </View>
                </View>

                <Button title="Confirmar pedido" onPress={() => navigation.navigate("Confirmation")} />
            </View>
            </>
        ) : (
            <View className="flex-1 justify-center items-center gap-5">
            <ShoppingBasket size={100} color="#F3752B" />
            <Text className="text-[20px]">Seu carrinho está vazio!</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                className="bg-pink px-5 py-3 rounded"
            >
                <Text className="text-white text-[18px]">Voltar para as compras</Text>
            </TouchableOpacity>
            </View>
        )}

        <View className="absolute bottom-0 w-full items-center">
            <TabButtons />
        </View>
    </SafeAreaView>
  );
}