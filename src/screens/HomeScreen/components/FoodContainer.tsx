import { useNavigation } from "@react-navigation/native";
import { Filter } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View , Text, TouchableOpacity} from "react-native";
import { Food } from "~/components/ui/Food";
import SearchProducts from "~/components/ui/SearchProducts";
import { useProduct } from "~/contexts/ProductsContext";

export default function FoodContainer() {
    const navigation = useNavigation<any>();
    const { products, listProducts } = useProduct();
    const [search, setSearch] = useState("");

    useEffect(() => {
        listProducts();
    }, []);

    const filteredProducts = products?.filter(product => 
        product.nome.toLowerCase().includes(search.toLowerCase())
    );

    return(
       <View className="p-5 gap-4 w-full">
            <View className="flex justify-between items-center flex-row mb-4 gap-1">
                <View className="w-[85%]">
                    <SearchProducts 
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
                <TouchableOpacity className="bg-white p-2 rounded">
                    <Filter size={30} color="#F3752B" />
                </TouchableOpacity>
            </View>
            {
                products ? (
                    filteredProducts?.map(product => (
                        <Food 
                            key={product.id}
                            img={product.imagem}
                            price={product.preco}
                            desc={product.nome} 
                            onPress={() => navigation.navigate('Details', { productId: product.id})} 
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