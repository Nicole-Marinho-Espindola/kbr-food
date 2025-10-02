import { Dimensions, View, Image, Text } from "react-native";

type CategorieProps = {
  categorieTxt: string;
  img?: any;
};

export function Categorie({ categorieTxt, img }: CategorieProps) {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 32) / 3; 
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


export default function Categories() {
  return (
    <View className="flex flex-row flex-wrap justify-between pt-16 pb-5 px-2 w-full">
      <Categorie categorieTxt="Tudo" />
      <Categorie categorieTxt="Café" />
      <Categorie categorieTxt="Almoço" />
      <Categorie categorieTxt="Doces" />
      <Categorie categorieTxt="Salgados" />
      <Categorie categorieTxt="Padaria" />
    </View>
  );
}
