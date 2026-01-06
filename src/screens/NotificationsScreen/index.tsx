import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { NotepadText, Bell, Trash, BellOff, Ban  } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function NotificationScreen() {
    const [Notifications, setNotifications] = useState<any[]>([]); 
    const navigation = useNavigation<any>();

    useEffect(() => {
        (async () => {
            const savedNotifications = await AsyncStorage.getItem("notifications");
            if (savedNotifications) {
                setNotifications(JSON.parse(savedNotifications));
            }
        })();
    }, []);

    const handleCleanNotifications = async () => {
        await AsyncStorage.removeItem("notifications");
        setNotifications([]);
    }

    return(
        <SafeAreaView className="flex-1 px-5">
            {
                Notifications ? (
                    <>
                        <View className="flex flex-row items-center gap-3.5 mb-10">
                            <Bell size={24} color="#A20021" />
                            <Text className="text-[25px] font-light">Notificações recebidas</Text>
                        </View>
                        <TouchableOpacity onPress={handleCleanNotifications} className='w-full flex justify-center items-end'>
                            <View className='flex flex-row p-1 border-b-2 border-pink mb-5 gap-4'>
                                <Text className='text-[18px] text-gray-800'>Limpar notificações</Text>
                            </View>
                        </TouchableOpacity>
                        <View className='gap-3'>
                            {Notifications?.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((notification: any) => (
                                <View key={notification.id} className="bg-white w-full min-h-[90px] p-4 rounded-xl flex flex-col">
                                    <View className='flex flex-row gap-3 items-center mb-4'>
                                        {
                                            notification.title === "Pedido cancelado" ? <Ban size={24} color="#A20021" /> : <NotepadText size={24} color="#F3752B" />
                                        }
                                        <Text className={`font-semibold text-[18px] ${notification.title === "Pedido cancelado" ? "text-darkPink" : "text-black"}`}>{notification.title}</Text>
                                    </View>
                                    <Text>{notification.message}</Text>
                                    <View className="flex flex-row justify-end items-center mt-auto">
                                        <Text className='text-gray-500 text-sm mt-1'>
                                            {new Date(notification.date)
                                                .toLocaleString("pt-BR", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: false,
                                            })
                                            .replace(",", " -")
                                            .replace(":", "h")}
                                        </Text>
                                    </View>
                                </View> 
                            ))}
                        </View>
                    </>
                ): (
                    <View className="flex-1 justify-center items-center gap-5">
                        <BellOff size={100} color="#F3752B" />
                        <Text className="text-[20px]">Você não tem nenhuma notificação pendente!</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Home")}
                            className="bg-pink px-5 py-3 rounded"
                        >
                            <Text className="text-white text-[18px]">Voltar para as compras</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </SafeAreaView>
    )
}