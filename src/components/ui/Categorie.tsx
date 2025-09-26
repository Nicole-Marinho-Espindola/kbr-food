import { Dimensions, View, Image, Text } from "react-native";

type CategorieProps = {
  categorieTxt: string;
  img?: any;
};

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 32) / 3; 

export default function Categorie({ categorieTxt, img }: CategorieProps) {
  return (
    <View
      style={{ width: itemWidth }}
      className="flex justify-between items-center gap-2 mb-5 w-full"
    >
      <View className="bg-orange rounded-xl w-[100px] h-[80px] relative overflow-hidden" >
        <Image source={img} className="absolute right-0 bottom-0 h-8/10 w-1/2 object-contain bg-gray-700" />
      </View>
      <Text className="font-semibold">{categorieTxt}</Text>
    </View>
  );
}
