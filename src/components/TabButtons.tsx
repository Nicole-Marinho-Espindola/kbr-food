import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CarTaxiFrontIcon, Home, PersonStanding, Search, ShoppingCart, User } from "lucide-react-native";

export default function TabButtons() {
    const navigation = useNavigation<any>();

    return(
        <View className="absolute bottom-6 flex flex-row justify-center left-1/2 -translate-x-1/2 items-center bg-white h-20 shadow rounded-xl py-5 w-[350px]"> 
            <TouchableOpacity className="text-[20px]" onPress={() => navigation.navigate('Home')}>
                <Home size={30} color='#F52F57' />
            </TouchableOpacity>
            <TouchableOpacity className="ml-12 text-[20px]" onPress={() => navigation.navigate('Search')}>
                <Search size={30} color='#F52F57'/>
            </TouchableOpacity>
            <TouchableOpacity className="ml-12 text-[20px]" onPress={() => navigation.navigate('Cart')}>
                <ShoppingCart size={30} color='#F52F57'/>
            </TouchableOpacity>
            <TouchableOpacity className="ml-12 text-[20px]" onPress={() => navigation.navigate('Profile')}>
                <User size={30} color='#F52F57'/>
            </TouchableOpacity>
        </View>
    )
}