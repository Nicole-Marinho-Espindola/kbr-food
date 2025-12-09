import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, Folder } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text , Image, TouchableOpacity } from "react-native";
import { api } from "~/api/api";
import { Food } from "~/components/ui/Food";
import SearchProducts from "~/components/ui/SearchProducts";
import { useProduct } from "~/contexts/ProductsContext";
import { FolderOpen } from "lucide-react-native";


export function SearchCategorie({ name, img, color = "fff", onPress }: { name: string, img?: any, color?: string, onPress?: () => void }) {
  return(
    <TouchableOpacity 
      style={{ backgroundColor: `#${color}` }} 
      className="flex flex-row justify-between rounded-xl w-full h-[80px] relative overflow-hidden"
      onPress={onPress}
    >
      <Text className="font-semibold text-white text-[24px] p-5">{name}</Text>
      <View style={{ backgroundColor: `#${color}` }} className={`rounded-xl w-[100px] h-[80px] relative overflow-hidden`} >
        <Image source={{ uri: img }} className="h-full w-full object-contain" />
      </View>
    </TouchableOpacity>
  )
}

export default function Search() {
  const { categories, listCategories, products, listProducts } = useProduct();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    listProducts();
    listCategories();
  }, []);

  const filteredProducts = products?.filter(product => 
    (search ? product.nome.toLowerCase().includes(search.toLowerCase()) : true) &&
    (activeCategory ? product.categoriaNome === activeCategory : true)
  );

  return(
    <View className="flex-1  justify-center items-center p-5 w-full">
      <SearchProducts 
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          setActiveCategory(null); 
        }}
      />

      {(!search && !activeCategory) && (
        <>
          {categories?.length ? (
              <>
                <Text className="my-10 text-gray-400 text-[20px]">Ou escolha por categoria</Text>
                <View className="flex-1 flex-row flex-wrap justify-between w-full gap-3 pb-24">
                  {categories.map(categorie => (
                    <SearchCategorie 
                      key={categorie.id}
                      name={categorie.nome} 
                      color={categorie.corHex} 
                      img={categorie.imagem}
                      onPress={() => setActiveCategory(categorie.nome)}
                    />
                  ))}
                </View>
              </>
            ) : (
              <View className="flex-1 w-full justify-center items-center mt-10 pb-24">
                <FolderOpen size={50} color="#6b7280" />
                <Text className="text-[15px] text-gray-500 mt-8">Nenhuma categoria para listar</Text>
              </View>
            )}
        </>
      )}

      {(search || activeCategory) && (
        <View className="flex flex-row flex-wrap justify-between w-full gap-3 pt-10 pb-24">
            <TouchableOpacity onPress={() => { setSearch(""); setActiveCategory(null); }} className="flex justify-center items-center flex-row mb-5">
                <ChevronLeft size={30} color="#F52F57" />
                <Text className="text-[18px] text-pink font-semibold">Voltar</Text>
            </TouchableOpacity>
            {filteredProducts?.map(product => (
                <Food 
                  id={product.id}
                  key={product.id}
                  img={product.imagem}
                  price={product.preco}
                  desc={product.nome} 
                  onPress={() => navigation.navigate('Details', { productId: product.id})} 
                />
            ))}
        </View>
      )}
    </View>
  )
}
