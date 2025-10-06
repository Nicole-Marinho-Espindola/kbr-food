import { View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Heart, Home, Search, ShoppingCart, User } from "lucide-react-native";

export default function TabButtons() {
  const navigation = useNavigation<any>();
  const route = useRoute();

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
      <TouchableOpacity onPress={() => navigation.navigate("Favorite")}>
        <Heart size={30} color={getColor("Favorite")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <ShoppingCart size={30} color={getColor("Cart")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <User size={30} color={getColor("Profile")} />
      </TouchableOpacity>
    </View>
  );
}
