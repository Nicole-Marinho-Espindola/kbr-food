import { View, Text, Dimensions, Image } from "react-native";
import Categorie from "~/components/ui/Categorie";

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
