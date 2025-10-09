import { useNavigation } from "@react-navigation/native";
import { Filter } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View , Text, TouchableOpacity} from "react-native";
import { Food } from "~/components/ui/Food";
import SearchProducts from "~/components/ui/SearchProducts";
import { useProduct } from "~/contexts/ProductsContext";
import { SortAsc , SortDesc} from "lucide-react-native";
import { useFavorites } from "~/contexts/FavoriteContext"; 

interface Product {
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  categoriaID: number;
  categoriaNome: string;
  descricao: string;
}

export default function FoodContainer() {
    const navigation = useNavigation<any>();
    const { products, listProducts } = useProduct();
    const [search, setSearch] = useState("");
    const { favorites } = useFavorites();
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        listProducts();
    }, []);

    const filteredProducts = products?.filter(product => 
        product.nome.toLowerCase().includes(search.toLowerCase())
    );

    const [sortedProducts, setSortedProducts] = useState<Product[] | null>(null);

    const productsToDisplay = sortedProducts || filteredProducts;

    const handleSortAsc = () => {
    const sorted = [...filteredProducts].sort((a, b) => a.preco - b.preco);
    setSortedProducts(sorted);
    setFilter(false);
    };

    const handleSortDesc = () => {
    const sorted = [...filteredProducts].sort((a, b) => b.preco - a.preco);
    setSortedProducts(sorted);
    setFilter(false);
    };


    return(
       <View className="p-5 gap-4 w-full">
            <View className="relative flex justify-between items-center flex-row mb-4 gap-1">
                <View className="w-[85%]">
                    <SearchProducts 
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
                <TouchableOpacity onPress={() => setFilter(prev => !prev)} className="bg-white p-2 rounded">
                    <Filter size={30} color="#F3752B" />
                </TouchableOpacity>
                {
                    filter && (
                        <View className="absolute bottom-[-145px] right-0 bg-white p-2 rounded z-30 gap-3 duration-200">
                            <TouchableOpacity onPress={() => handleSortAsc()} className="flex justify-center items-center flex-row gap-2 py-5 px-2 bg-lightBlue rounded">
                                <SortAsc size={24} color="#F3752B" />
                                <Text className="text-[16px] text-darkGray">Ordenar por menor preço</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleSortDesc()} className="flex justify-center items-center flex-row gap-2 py-5 px-2 bg-lightBlue rounded">
                                <SortDesc size={24} color="#F3752B" />
                                <Text className="text-[16px] text-darkGray">Ordenar por maior preço</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
            {
                productsToDisplay ? (
                    productsToDisplay?.map(product => (
                        <Food 
                            id={product.id}
                            key={product.id}
                            img={product.imagem}
                            price={product.preco}
                            desc={product.nome} 
                            onPress={() => navigation.navigate('Details', { productId: product.id})} 
                            isFavorited={favorites?.includes(product.id)}
                        />
                    ))
                ) : (
                    <View className="flex justify-center items-center w-full">  
                        <Text>Nenhum produto para exibir</Text>
                    </View>
                )
            }
        </View>
    )
}