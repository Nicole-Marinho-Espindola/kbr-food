import { useNavigation } from "@react-navigation/native";
import { Bell, ChevronLeft, Dock, Info, LogOut, Ticket, User } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "~/components/form/Button";
import Input from "~/components/form/Input";

export default function ProfileScreen() {
    const navigation = useNavigation<any>();

    const handleEdit = () => {
        console.log("text")
    }
    
    return(
        <View className="p-5">
            <TouchableOpacity onPress={() => navigation.navigate('Home')} className="flex justify-start items-center flex-row w-full">
                <ChevronLeft size={24} color="#F52F57" />
                <Text className="text-[24px] text-pink">Voltar</Text>
            </TouchableOpacity>
            <View className="bg-white mt-5 rounded-xl">
                <View className="flex justify-start items-center w-full flex-row p-5">
                    <Ticket size={24} color="#F52F57" />
                    <Text className="font-light text-[25px] rounded-xl px-3">Cupons</Text>
                </View>
                <View className="flex justify-start items-center w-full flex-row p-5">
                    <Bell size={24} color="#F52F57" />
                    <Text className="font-light text-[25px] rounded-xl px-3">Notificações</Text>
                </View>
                <View className="flex justify-start items-center flex-row p-5 mb-5 bg-darkPink">
                    <Info size={24} color="#fff" />
                    <Text className="font-light text-[25px] text-white px-3">Dados da Conta:</Text>
                </View>
                <View className="flex justify-center items-end my-5 p-5">
                    <View className="flex w-full">
                        <Text className="text-[20px] font-light">Nome:</Text>
                        <Input type="text"/>
                    </View>
                    <View className="flex w-full">
                        <Text className="text-[20px] font-light">Email:</Text>
                        <Input type="text"/>
                    </View>
                    <View className="flex w-full">
                        <Text className="text-[20px] font-light">Número:</Text>
                        <Input type="text"/>
                    </View>
                    <View className="flex w-full">
                        <Text className="text-[20px] font-light">Endereço:</Text>
                        <Input type="text"/>
                    </View>
                    <Button title="Editar" onPress={() => handleEdit()} className="!w-1/2" />
                </View>
                <View className="flex justify-start items-center flex-row p-5 pt-0">
                    <LogOut size={24} color="#F52F57" />
                    <Text className="text-[24px] font-light px-3">Sair</Text>
                </View>
            </View>
        </View>
    )
}