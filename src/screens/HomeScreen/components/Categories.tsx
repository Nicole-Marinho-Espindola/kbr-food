import { Plus } from "lucide-react-native";
import { useEffect } from "react";
import { Dimensions, View, Image, Text } from "react-native";
import { api } from "~/api/api";
import { useProduct } from "~/contexts/ProductsContext";

type CategorieProps = {
  categorieTxt: string;
  img?: any;
  color?: string;
};

export function Categorie({ categorieTxt, img, color = "#F3752B" }: CategorieProps) {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 32) / 3; 
  return (
    <View
      style={{ width: itemWidth }}
      className="flex justify-between items-center gap-2 mb-5 w-full"
    >
      <View style={{ backgroundColor: `#${color}` }} className={`rounded-xl w-[100px] h-[80px] relative overflow-hidden`} >
        <Image source={{ uri: `${api}/${img}` }} className="absolute right-0 bottom-0 h-8/10 w-1/2 object-contain bg-gray-700" />
      </View>
      <Text className="font-semibold">{categorieTxt}</Text>
    </View>
  );
}


export default function Categories() {
  const {categories, listCategories} = useProduct();

  useEffect(() => {
      listCategories();
  }, []);

  return (
    <View className="flex justify-center items-center w-full pt-16 pb-3">
      <View className="flex flex-row flex-wrap justify-between px-2 w-full">
        {
          categories ? (
            categories?.slice(0, 6).map(categorie => (
              <Categorie 
                key={categorie.id}
                categorieTxt={categorie.nome} 
                color={categorie.corHex} 
                img={categorie.imagem} 
              />
            ))
          ): (
            <View>
              <Text>Nenhuma categoria para listar</Text>
            </View>
          )
        }
      </View>
    </View>
  );
}
