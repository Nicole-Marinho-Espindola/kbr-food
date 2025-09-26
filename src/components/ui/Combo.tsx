import { View, Image, Text } from "react-native";

export default function Combo({img, text, price, direction = "flex-col"}: {img?:any, text:string, price:string, direction?: string}) {
    return(
        <View className="flex justify-start items-start flex-row my-2 w-full">
            <View className="h-[60px] w-[70px] rounded-xl bg-lightGray mr-4 overflow-hidden">
                <Image source={img} className="h-full w-full object-contain" />
            </View>
            <View className={`flex justify-center items-start ${direction}`}>
                <Text className="text-[20px]">{text}</Text>
                <Text className="text-green-500 text-[20px]">{price}</Text>
            </View>
        </View>
    )
}