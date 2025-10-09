import { View } from "react-native";
import NavBar from "./components/NavBar";
import Categories from "./components/Categories";
import Promotions from "./components/Promotions";
import FoodContainer from "./components/FoodContainer";

export default function HomeScreen() {

  return (
    <View className="flex justify-center items-center mb-28">
        <NavBar />
        <View className="flex justify-between bg-white rounded-tl-[90px] my-10 rounded-br-[90px] w-full h-[42em]">
            <Categories />
            <View className="bg-darkPink rounded-tl-[74px] rounded-br-[90px] h-1/2">
                <Promotions />
            </View>
        </View>
        <FoodContainer />
    </View>
  );
}
