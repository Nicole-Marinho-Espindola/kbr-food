import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "~/components/form/Input";
import Button from "~/components/form/Button";
import LogoTxt from "~/components/LogoTxt";
import MainTitle from "~/components/MainTitle";
import Container from "~/components/form/Container";
import { useState } from "react";

export default function SignUp() {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(1);

  const handleChange = () => {
    setStep(2);
  }

  const handleAddUser = () => {
    console.log("Usuário adicionado");
    navigation.navigate('Home');
  }

  return (
    <View className="bg-darkPink flex justify-start items-center flex-col h-[100vh]" >
      <TouchableOpacity className="flex justify-start items-center flex-row mt-20 px-10 w-full">
        <ChevronLeft size={30} color='#fff' />
        <Text className="text-white text-[20px]">Voltar</Text>
      </TouchableOpacity>
      <Container className={`${step === 1 ? 'pt-48 -top-10 h-[90vh]' : 'pt-20 -bottom-10' }`}>
        <MainTitle 
          title="Cadastre-se!" 
          subtitle="Pronto para conhecer os melhores restaurantes?" 
        />
        <View className="flex justify-center items-center flex-col w-full mt-20 space-y-10">
          {
            step === 1 && (
              <View className="w-full">
                <Input placeholder="Nome Completo" type="text" />
                <Input placeholder="Email" type="text" />
                <Input placeholder="Telefone" type="text" />
              </View>
            )
          }
          {
            step === 2 && (
              <View className="w-full">
                <Input placeholder="Senha" type="password" />
                <Input placeholder="Repetir Senha" type="password" />
              </View>
            )
          }
          <View className="flex justify-center items-center text-[16px] font-light my-10 w-full"> 
            <Text className="text-light">Já possui conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text className="text-orange-500 text-[16px] font-regular text-orange">
                Entre aqui
              </Text>
            </TouchableOpacity>
          </View>
          {step === 1 ? Button({ title: 'Próximo', onPress: () => handleChange() }) : Button({ title: 'Finalizar', onPress: () => handleAddUser() })}
        </View>
      </Container>
        <View className="absolute bottom-20 w-full">
          <LogoTxt />
        </View>
    </View>
  );
}