import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "~/components/form/Input";
import Button from "~/components/form/Button";
import LogoTxt from "~/components/LogoTxt";
import MainTitle from "~/components/MainTitle";
import Container from "~/components/form/Container";
import { useState } from "react";
import { useAuth } from "~/contexts/AuthContext";

export default function SignUp() {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { signUp } = useAuth();
  
  const handleAddUser = async () => {
    try {
      const userData = await signUp(user.name, user.email, user.password )
      navigation.navigate('Home');
      return userData;
    } catch (err: any) {
      console.log("Erro ao cadastrar:", err);
      alert(err.message || "Erro inesperado");
    }
  };

  return (
    <View className="bg-darkPink flex justify-start items-center flex-col h-[100vh]" >
      <TouchableOpacity onPress={() => navigation.navigate('Login')} className="flex justify-start items-center flex-row mt-20 px-10 w-full">
        <ChevronLeft size={30} color='#fff' />
        <Text className="text-white text-[20px]">Voltar</Text>
      </TouchableOpacity>
      <Container className={` pt-20 -bottom-10`}>
        <MainTitle 
          title="Cadastre-se!" 
          subtitle="Pronto para conhecer os melhores restaurantes?" 
        />
        <View className="flex justify-center items-center flex-col w-full mt-20 space-y-10">
          <View className="w-full">
            <Input
              placeholder="Nome Completo"
              type="text"
              value={user.name}
              onChangeText={(text) => setUser(prev => ({ ...prev, name: text }))}
            />

            <Input
              placeholder="Email"
              type="text"
              value={user.email}
              onChangeText={(text) => setUser(prev => ({ ...prev, email: text }))}
            />

            <Input
              placeholder="Senha"
              type="password"
              value={user.password}
              onChangeText={(text) => setUser(prev => ({ ...prev, password: text }))}
            />
          </View>
          <View className="flex justify-center items-center text-[16px] font-light my-10 w-full"> 
            <Text className="text-light">Já possui conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text className="text-orange-500 text-[16px] font-regular text-orange">
                Entre aqui
              </Text>
            </TouchableOpacity>
          </View>
          <Button title="Finalizar" onPress={handleAddUser} />
        </View>
      </Container>
    </View>
  );
}