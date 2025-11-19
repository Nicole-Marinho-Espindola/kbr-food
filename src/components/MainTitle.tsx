import { Text, View } from "react-native";

type MainTitleProps = {
  className?: string;
  title: string;
  subtitle: string;
};

export default function MainTitle({ title, subtitle, className }: MainTitleProps) {
  return (
    <View className="flex justify-center items-center space-y-10">
      <Text className={`text-[30px] font-regular mb-5 ${className}`}>{title}</Text>
      <Text className={`font-light text-center text-[18px] ${className}`}>{subtitle}</Text>
    </View>
  );
}
