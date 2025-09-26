import { useNavigation } from "@react-navigation/native";
import { View, } from "react-native";
import MainTitle from "~/components/MainTitle";
import Button from "~/components/form/Button";

export default function Initial() {
  const navigation = useNavigation<any>();

  return (
    <View className="bg-darkPink flex justify-center items-center flex-col h-[100vh] px-10" >
        <MainTitle 
          title="Seja Bem-Vindo!" 
          subtitle="Pronto para conhecer os melhores restaurantes?" 
          className="text-white"
        />
        <View className="w-full mt-20 space-y-10 mb-20">
          <Button className="mb-8 " title='Entrar' onPress={() => navigation.navigate('Login')} />
          <Button textColor="text-white" className="!bg-transparent border border-white" title='Cadastre-se' onPress={() => navigation.navigate('SignUp')} />
        </View>
    </View>
  );
}
