import { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

export default function LoadingScreen() {
  const [Images, setImages] = useState([
    require("../../../../assets/lamen.png"),
    require("../../../../assets/hot-pot.png"),
    require("../../../../assets/burger.png"),
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Images.length);
    }, 500); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-darkPink">
      <View className="h-[20em] w-[20em] mb-10">
        <Image source={Images[currentIndex]} className="h-full w-full object-contain" />
      </View>
      <Text className="text-white font-bold text-[24px]">Carregando...</Text>
    </View>
  );
}
