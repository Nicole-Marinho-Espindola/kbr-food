import { View, Text } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EDEDF4' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F3752B' }}>Carregando...</Text>
    </View>
  );
}
