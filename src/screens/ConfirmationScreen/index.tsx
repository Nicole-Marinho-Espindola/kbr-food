import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Info } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message"; 
import TabButtons from "~/components/TabButtons";
import { useCart } from "~/contexts/CartContext";
import { usePushOrder } from "~/hooks/usePushOrder";

export function ConfirmationItem({ title, price, desc, quantity }: { title: string, price: number, desc: string, quantity: number | string }) {
  return (
    <View className="bg-white w-full min-w-[20em] p-4 rounded-xl flex justify-start items-start flex-col">
      <Text className="text-darkPink font-semibold">{title}</Text>
      <View className="flex justify-between items-center flex-row w-full my-2">
        <Text className="text-green-600">R$ {price}</Text>
        <Text>x{quantity}</Text>
      </View>
      <Text className="text-gray-400">{desc}</Text>
    </View>
  );
}

type orderStatus = "Pendente" | "Entregue";

type Order = {
  id: number;
  items: {
    id: number;
    title: string;
    description?: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  total: number;
  address: string;
  number: string;
  paymentMethod: string;
  date: string;
  status: orderStatus;
};

export default function ConfirmationScreen() {
  const [num, setNum] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Dinheiro" | "Pix" | "">("");
  const { cart, handlePlaceOrder } = useCart();
  const navigation = useNavigation<any>();
  const { registerForPushNotificationsAsync, sendNotification } = usePushOrder();

  useEffect(() => {
    (async () => {
      const savedLocation = await AsyncStorage.getItem("user_address");
      if (savedLocation) setAddress(savedLocation);
    })();
  }, []);

  const calcularTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const placeOrder = async () => {
        if (!address || !num || !paymentMethod) {
          Toast.show({
            type: "error",
            text1: "Ops!",
            text2: "Preencha todos os campos antes de finalizar o pedido",
          });
          return;
        }

      const novoPedido = {
        id: Date.now(),
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        address,
        number: num,
        paymentMethod,
        date: new Date().toISOString(),
        status: "Pendente" as const,
      };

      await handlePlaceOrder(novoPedido);

      Toast.show({
        type: "success",
        text1: "Pedido finalizado com sucesso!",
        text2: `Pagamento via ${paymentMethod} confirmado.`,
      });

      await registerForPushNotificationsAsync();
      await sendNotification( 'Pedido confirmado!', 'Seu pedido está sendo preparado com amor e agilidade');
      navigation.navigate("Orders");
    };

  return (
    <View className="flex justify-start items-center h-screen w-full gap-5">
      <View className="font-light text-[20px] mb-3 h-40 pt-12 bg-darkPink w-full flex justify-center items-center flex-row gap-2 rounded-br-[50px]">
        <Info size={20} color="#fff" />
        <Text className="text-white text-[24px] font-semibold">Informações do pedido</Text>
      </View>
      <View className="px-5">
        <Text className="font-light text-[18px] mb-3">Confirmar pedido:</Text>
        <ScrollView
          className="w-full max-h-[15em] border border-gray-300 rounded-xl p-3"
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
        >
          {cart.map((item) => (
            <ConfirmationItem
              key={item.id}
              title={item.title}
              price={item.price}
              desc={item.description || "Nenhuma observação"}
              quantity={item.quantity}
            />
          ))}
        </ScrollView>
      </View>
      <View className="w-full mb-2 px-5">
        <Text className="font-light text-[18px] mb-4">Confirmar endereço:</Text>
        <View className="flex justify-center items-center w-full">
          <View className="w-full mb-4">
            <Text className="text-darkPink">Número:</Text>
            <TextInput
              value={num}
              onChangeText={(text) => setNum(text)}
              className="border-b border-gray-300 px-2 py-3 w-full"
              placeholder="Digitar número..."
            />
          </View>
          <View className="w-full">
            <Text className="text-darkPink">Endereço <Text className="text-gray-500">(editável)</Text>:</Text>
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              className="border-b border-gray-300 px-2 py-3 w-full"
              placeholder="Digitar endereço..."
            />
          </View>
        </View>
      </View>
      <View className="w-full px-5">
        <Text className="font-light text-[18px] mb-3">Forma de pagamento:</Text>
        <View className="w-full flex flex-row gap-3">
          {["Dinheiro", "Pix"].map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() => setPaymentMethod(method as "Dinheiro" | "Pix")}
              className={`flex-1 border rounded-xl p-3 items-center ${paymentMethod === method ? "border-darkPink bg-pink-100" : "border-gray-300"
                }`}
            >
              <Text className={`${paymentMethod === method ? "text-darkPink font-semibold" : ""}`}>
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="px-5 mb-10">
        <TouchableOpacity
          onPress={placeOrder}
          className={`w-full bg-orange h-14 rounded-lg flex flex-row justify-between items-center px-5`}
        >
          <Text className={`text-[20px] font-light text-[#ffcaa4]`}>Finalizar pedido</Text>
          <Text className={`text-[20px] font-light text-white`}>R$ {calcularTotal()}</Text>
        </TouchableOpacity>
      </View>
      <TabButtons />
      <Toast />
    </View>
  );
}
