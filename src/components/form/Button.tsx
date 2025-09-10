import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    title: string;
    className?: string;
    textColor?: string;
    onPress: () => void;
}

export default function Button({ title, onPress, className, textColor = 'text-white' }: ButtonProps) {
    return(
        <TouchableOpacity
            onPress={onPress}
            className={`${className} w-full bg-lightOrange h-14 rounded-lg flex justify-center items-center`}
        >
            <Text className={`${textColor} text-[20px] font-light`}>{title}</Text>
        </TouchableOpacity>
    )
}