import { Bell } from "lucide-react-native";
import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NavBar() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAddress() {
      const savedAddress = await AsyncStorage.getItem("user_address");
      if (savedAddress) {
        setAddress(savedAddress);
      }
    }
    loadAddress();
  }, []);

  async function requestLocationOnce() {
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permissão negada");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const geocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (geocode.length > 0) {
        const { street, district, city, region } = geocode[0];
        const formatted = `${street}, ${district}, ${city} - ${region}`;
        setAddress(formatted);

        await AsyncStorage.setItem("user_address", formatted);
      } else {
        setError("Não foi possível obter endereço");
      }
    } catch (e: any) {
      setError(e.message || "Erro ao obter localização");
    }
  }

  return (
    <View className="px-5 mt-5 w-full">
      <View className="relative flex justify-start items-center flex-row w-full">
        <TouchableOpacity onPress={() => {}} className="mr-8">
          <Bell size={34} color="#F52F57" />
        </TouchableOpacity>

        {address ? (
          <View className="relative flex justify-center items-center flex-wrap h-[35px] w-[22em] rounded flex-row">
            <Text className="font-semibold w-full">{address}</Text>
          </View>
        ) : (
          <Button title="Pegar localização agora" onPress={requestLocationOnce} />
        )}
      </View>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}
