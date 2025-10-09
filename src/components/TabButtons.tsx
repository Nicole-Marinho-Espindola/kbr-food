import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Home, NotepadText, Search, ShoppingCart, User } from "lucide-react-native";
import { useCart } from "~/contexts/CartContext";

export default function TabButtons() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {cart, cartCount} = useCart();

  const getColor = (screen: string) =>
    route.name === screen ? "#F52F57" : "#F79D5C"; 

  return (
    <View className="absolute bottom-5 flex flex-row justify-between left-1/2 -translate-x-1/2 items-center bg-white h-20 shadow rounded-xl py-5 px-6 w-[350px]">
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Home size={30} color={getColor("Home")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Search size={30} color={getColor("Search")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")} className="relative">
        {
          cart.length > 0 ? (
            <View className="bg-pink h-4 w-4 rounded-full absolute -top-1.5 -right-2 flex justify-center items-center z-30">
              <Text className="text-white font-semibold">{cartCount}</Text>
            </View>
          ): (
            <></>
          )
        }
        <ShoppingCart size={30} color={getColor("Cart")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
        <NotepadText size={30} color={getColor("Orders")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <User size={30} color={getColor("Profile")} />
      </TouchableOpacity>
    </View>
  );
}
