import { View } from "react-native";
import NavBar from "./components/NavBar";
import Categories from "./components/Categories";
import Promotions from "./components/Promotions";
import FoodContainer from "./components/FoodContainer";
import Ad from "./components/Ad";
import CombosPromo from "./components/CombosPromo";

export default function HomeScreen() {

  return (
    <View className="flex justify-center items-center mb-28">
        <NavBar />
        <Ad />
        <View className="flex justify-between bg-white rounded-tl-[90px] my-10 rounded-br-[90px] w-full h-[42em]">
            <Categories />
            <View className="bg-darkPink rounded-tl-[74px] rounded-br-[90px] h-1/2">
                <Promotions />
            </View>
        </View>
        <CombosPromo />
        <FoodContainer />
    </View>
  );
}
