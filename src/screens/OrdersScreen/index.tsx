import { View, Text,ScrollView, TouchableOpacity } from "react-native";
import TabButtons from "~/components/TabButtons";
import {FileClock } from "lucide-react-native"
import Button from "~/components/form/Button";
import { useCart } from "~/contexts/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PackageSearch } from "lucide-react-native";
import { useNavigation } from "@react-navigation/core";

export function OldOrder({ order, onConfirmDelivery, onCancel }: { order: any, onConfirmDelivery: () => void , onCancel: () => void }) {
  const [status, setStatus] = useState(order.status);
  const [date, setDate] = useState(order.date);

  const handleConfirm = () => {
    const now = new Date().toISOString();
    setStatus("Entregue");
    setDate(now);
    onConfirmDelivery(); 
  };

  const handleCancel = async () => {
    setStatus("Cancelado");

    const saveNotification = await AsyncStorage.getItem("notifications");
    const notificationsArray = saveNotification ? JSON.parse(saveNotification) : [];
    notificationsArray.push({ 
      id: Date.now(), 
      title: 'Pedido cancelado', 
      message: `Seu pedido #${order.id} foi cancelado com sucesso!`, 
      date: new Date().toISOString() 
    });
    await AsyncStorage.setItem("notifications", JSON.stringify(notificationsArray));
    
    onCancel();
  };

  const dataFormatada = date ? dayjs(date).format("DD/MM/YYYY") : "";

  return (
    <View className="bg-white w-full min-h-[100px] p-4 rounded-xl flex flex-col my-2">
      <Text className="text-pink font-semibold">Pedido #{order.id}</Text>

      <View className="flex flex-col w-full my-2">
        {order.items?.length ? (
          order.items.map((item: any) => (
            <Text key={item.id} className="text-darkGray">
              {item.title} x{item.quantity}
            </Text>
          ))
        ) : (
          <Text className="text-darkGray">Nenhum item no pedido</Text>
        )}
      </View>

      <Text className="text-green-600 my-2">R$ {order.total.toFixed(2)}</Text>
      <Text className={`${status === "Cancelado" ? "text-darkPink font-semibold" : "text-gray-400"}  mb-2`}>
        {status === "Entregue"
          ? `Entregue em ${dataFormatada}`
          : status === "Cancelado"
          ? "Pedido cancelado"
          : "Aguardando entrega..."}
      </Text>

      {status === "Pendente" && (
        <View className="flex-row justify-between w-full mt-2">
          <Button title="Confirmar entrega" className="flex-1 mr-2 !h-12" onPress={handleConfirm} />
          <Button title="Cancelar pedido" className="flex-1 ml-2 !h-12 !bg-darkPink" onPress={handleCancel} />
        </View>
      )}
    </View>
  );
}


export default function OrdersScreen() {
    const {pedidosAntigos, setPedidosAntigos} = useCart();

    const ConfirmDelivery = async (pedidoId: number) => {
        const atualizados = pedidosAntigos.map((p) =>
        p.id === pedidoId ? { ...p, status: "Entregue" as const } : p
        );
        setPedidosAntigos(atualizados);
        await AsyncStorage.setItem("pedidos_antigos", JSON.stringify(atualizados));
        Toast.show({ type: "success", text1: "Entrega confirmada!", text2: "Pedido marcado como entregue 🎉" });
    };

     const CancelOrder = async (pedidoId: number) => {
        const atualizados = pedidosAntigos.map((p) =>
            p.id === pedidoId ? { ...p, status: "Cancelado" as const } : p
        );
        setPedidosAntigos(atualizados);
        await AsyncStorage.setItem("pedidos_antigos", JSON.stringify(atualizados));
        Toast.show({ type: "info", text1: "Pedido cancelado", text2: "O pedido foi cancelado com sucesso" });
    };

    const navigation = useNavigation<any>();

    return(
        <SafeAreaView className="flex-1">
          <View className="p-5 flex-1">
            {pedidosAntigos?.length ? (
              <>
                <View className="flex flex-row items-center gap-3.5 mt-4">
                  <FileClock size={24} color="#A20021" />
                  <Text className="text-[25px] font-light">Histórico de pedidos</Text>
                </View>
                <ScrollView
                  className="mt-8 flex-1 mb-20"
                  contentContainerStyle={{ flex: pedidosAntigos?.length ? 0 : 1 }}
                >
                    {pedidosAntigos.map((pedido) => (
                      <OldOrder
                        key={pedido.id}
                        order={pedido}
                        onConfirmDelivery={() => ConfirmDelivery(pedido.id)}
                        onCancel={() => CancelOrder(pedido.id)}
                      />
                    ))}
                </ScrollView>
              </>
              ) : (
                <View className="flex justify-center items-center h-full w-full gap-5">
                    <PackageSearch size={80} color="#F3752B" />
                    <Text className="text-[20px]">Nenhum pedido no histórico!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} className="bg-pink px-5 py-3 rounded">
                        <Text className="text-white text-[18px]">Voltar para as compras</Text>
                    </TouchableOpacity>
                </View>
              )}
            </View>
          <View
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
          >
            <TabButtons />
          </View>
        </SafeAreaView>
    )
}