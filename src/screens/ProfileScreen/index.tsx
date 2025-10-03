import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Bell, ChevronLeft, Info, LogOut, Ticket } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "~/components/form/Button";
import Input from "~/components/form/Input";
import { useAuth } from "~/contexts/AuthContext";

interface User {
    name: string,
    email: string,
    password: string
}

export default function ProfileScreen() {
    const [dropdown, setDropdown] = useState({
        cupons: false,
        notifications: false,
        data: false,
    })
    const navigation = useNavigation<any>();
    const { signOut, user } = useAuth();
    const [address, setAddress] = useState<any>();
    const [userEdited, setUserEdited] = useState<User>({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        (async () => {
            const savedAddress = await AsyncStorage.getItem("user_address");
            if (savedAddress) setAddress(savedAddress);

            if (user && typeof user !== "string") {
            setUserEdited({
                name: user.name,
                email: user.email,
                password: user.password,
            });
            }
        })();
    }, [user]);



    const handleEditAddress = async () => {
        const savedAddress = await AsyncStorage.setItem("user_address", address );
        return savedAddress;
    }

    const handleEdit = async () => {
        const newUser = {
            name: userEdited.name,
            email: userEdited.email,
            password: userEdited.password
        };

        const storedUsers = await AsyncStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const updatedUsers = users.map((u: { email: string; }) => u.email === userEdited.email ? newUser : u);
        await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

        console.log("Usuario editado com sucesso");
    }

    const handleLogOut = async () => {
        await signOut();
        navigation.navigate("Initial");
    }
    
    return(
        <View className="p-5">
            <TouchableOpacity onPress={() => navigation.navigate('Home')} className="flex justify-start items-center flex-row w-full">
                <ChevronLeft size={24} color="#F52F57" />
                <Text className="text-[24px] text-pink">Voltar</Text>
            </TouchableOpacity>
            <Text className="text-[30px] font-light mt-10 mb-5">Bem vindo(a), <Text className="text-orange"> {userEdited.name.trim().split(' ')[0]}!</Text></Text>
            <View className="bg-white mt-5 rounded-xl">
                <TouchableOpacity className="flex justify-start items-center w-full flex-row p-5">
                    <Ticket size={24} color="#F3752B" />
                    <Text className="font-light text-[25px] rounded-xl px-3">Cupons</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex justify-start items-center w-full flex-row p-5">
                    <Bell size={24} color="#F3752B" />
                    <Text className="font-light text-[25px] rounded-xl px-3">Notificações</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setDropdown(prev => ({...prev, dropdown: true}))} 
                    className="flex justify-start items-center flex-row p-5 pb-0 mb-5"
                >
                    <Info size={24} color="#F3752B" />
                    <Text className="font-light text-[25px] px-3">Dados da Conta</Text>
                </TouchableOpacity>
                {
                    dropdown.data && (
                        <View className="flex justify-center items-end mb-5 p-5 bg-darkPink/5">
                            <View className="flex w-full">
                                <Text className="text-[20px] font-light">Nome:</Text>
                                <Input 
                                    type="text" 
                                    value={userEdited.name} 
                                    onChangeText={(text) => setUserEdited(prev => ({...prev, name: text}))}
                                />
                            </View>
                            <View className="flex w-full">
                                <Text className="text-[20px] font-light">Email:</Text>
                                <Input 
                                    type="text" 
                                    value={userEdited.email}
                                    onChangeText={(text) => setUserEdited(prev => ({...prev, email: text}))}
                                />
                            </View>
                            <View className="flex w-full">
                                <Text className="text-[20px] font-light">Senha:</Text>
                                <Input 
                                    type="password" 
                                    value={userEdited.password}
                                    onChangeText={(text) => setUserEdited(prev => ({...prev, password: text}))}
                                />
                            </View>
                            <View className="flex w-full">
                                <Text className="text-[20px] font-light">Endereço:</Text>
                                <Input type="text" value={address} onChangeText={(text) => setAddress(text)}/>
                            </View>
                            <Button 
                                title="Editar" 
                                onPress={() => {
                                    handleEdit();
                                    handleEditAddress();
                                }} 
                                className="!w-1/2" 
                            />
                        </View>
                    )
                }
                <TouchableOpacity onPress={() => handleLogOut()} className="flex justify-start items-center flex-row p-5 pt-0">
                    <LogOut size={24} color="#F52F57" />
                    <Text className="text-[24px] font-light px-3">Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}