import { Text, View } from "react-native";

type MainTitleProps = {
  title: string;
  subtitle: string;
};

export default function MainTitle({ title, subtitle }: MainTitleProps) {
  return (
    <View className="flex justify-center items-center space-y-10">
      <Text className="text-[32px] font-regular mb-5">{title}</Text>
      <Text className="font-light text-center text-[20px]">{subtitle}</Text>
    </View>
  );
}
