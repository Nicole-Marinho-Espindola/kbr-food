import { useState } from "react";
import { View, TextInput } from "react-native";

interface InputProps {
    placeholder?: string;
    type?: 'text' | 'password';
    borderColor?: string;
    onChangeText?: (text: string) => void;
    value: string;
}

export default function Input({ placeholder, type = 'text', borderColor = "border-[#8E8B8A]", onChangeText ,value}: InputProps) {
    const [text, setText] = useState('');

    return(
        <View className={`w-full border-b ${borderColor} mb-6 px-3`}>
            <TextInput
                value={value}
                secureTextEntry={type === 'password'}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className="w-full h-12 text-[18px]"
            />
        </View>
    )
}