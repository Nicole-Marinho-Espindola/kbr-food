import { useNavigation } from "@react-navigation/native";
import { View, } from "react-native";
import MainTitle from "~/components/MainTitle";
import Button from "~/components/form/Button";
import LogoTxt from "~/components/LogoTxt";
import Container from "~/components/form/Container";

export default function Initial() {
  const navigation = useNavigation<any>();

  return (
    <View className="bg-darkPink flex justify-end items-center flex-col h-[100vh]" >
      <Container className="-bottom-10 pt-40 h-[90vh]">
        <MainTitle 
          title="Seja Bem-Vindo!" 
          subtitle="Pronto para conhecer os melhores restaurantes?" 
        />
        <View className="w-full mt-20 space-y-10">
          <Button className="mb-8" title='Entrar' onPress={() => navigation.navigate('Login')} />
          <Button textColor="text-orange" className="!bg-transparent border border-orange" title='Cadastre-se' onPress={() => navigation.navigate('SignUp')} />
        </View>
        <View className="absolute bottom-24 w-full">
          <LogoTxt />
        </View>
      </Container>
    </View>
  );
}
