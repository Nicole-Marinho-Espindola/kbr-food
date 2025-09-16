import { View, Text, Dimensions, Image } from "react-native";

type CategorieProps = {
  categorieTxt: string;
};

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 32) / 3; 

export function Categorie({ categorieTxt }: CategorieProps) {
  return (
    <View
      style={{ width: itemWidth }}
      className="flex justify-between items-center gap-2 mb-5"
    >
      <View className="rounded h-[65px] w-[65px] bg-lightBlue overflow-hidden" >
        <Image source={require('../../../../assets/food.png')} className="h-full w-full object-contain" />
      </View>
      <Text className="text-white">{categorieTxt}</Text>
    </View>
  );
}

export default function Categories() {
  return (
    <View className="flex flex-row flex-wrap justify-between pt-14 pb-10 px-2">
      <Categorie categorieTxt="Tudo" />
      <Categorie categorieTxt="Café" />
      <Categorie categorieTxt="Almoço" />
      <Categorie categorieTxt="Doces" />
      <Categorie categorieTxt="Salgados" />
      <Categorie categorieTxt="Padaria" />
    </View>
  );
}
