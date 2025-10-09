import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "~/components/form/Input";
import MainTitle from "~/components/MainTitle";
import Button from "~/components/form/Button";
import LogoTxt from "~/components/LogoTxt";
import Container from "~/components/form/Container";
import { useAuth } from "~/contexts/AuthContext";
import { useState } from "react";

export default function Login() {
  const navigation = useNavigation<any>();
  
  const [error , setError] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const { signIn } = useAuth()

  const handleLoginUser = async () => {
    try {
      await signIn(user.email, user.password);
      navigation.navigate("Home");
    } catch (err: any) {
      setError(err.message || "Erro inesperado. Tente novamente.");
      setUser({ email: "", password: "" });
    }
  };

  return (
    <View className="bg-darkPink flex justify-end items-center flex-col h-[100vh]" >
      <Container className="-bottom-10">
        <MainTitle 
          title="Bem vindo de Volta!" 
          subtitle="Pronto para conhecer os melhores restaurantes?" 
        />
        <View className="w-full mt-20 space-y-10">
          <Input 
            placeholder="Email" 
            type="text" 
            value={user.email} 
            onChangeText={(text) => setUser(prev => ({ ...prev, email: text })) }
          />
          <Input 
            placeholder="Senha" 
            type="password" 
            value={user.password} 
            onChangeText={(text) => setUser(prev => ({...prev, password: text}))}
          />
          {
            error && (
              <View className="flex justify-center items-center w-full">
                <Text className="text-red-700 text-[15px]"> {error} </Text>
              </View>
            )
          }
          <View className="flex justify-center items-center text-[16px] font-light my-10 w-full"> 
            <Text className="text-light">Não possui uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-orange-500 text-[16px] font-regular text-orange">
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
          <Button  title='Entrar' onPress={handleLoginUser} />
        </View>
        <View className="absolute bottom-24 w-full">
          <LogoTxt />
        </View>
      </Container>
    </View>
  );
}
