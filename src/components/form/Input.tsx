import { useState } from "react";
import { View, TextInput } from "react-native";

interface InputProps {
    placeholder?: string;
    type?: 'text' | 'password';
    borderColor?: string;
}

export default function Input({ placeholder, type = 'text', borderColor = "border-[#8E8B8A]" }: InputProps) {
    const [text, setText] = useState('');

    return(
        <View className={`w-full border-b ${borderColor} mb-6 px-5`}>
            <TextInput
                value={text}
                secureTextEntry={type === 'password'}
                onChangeText={newText => setText(newText)}
                placeholder={placeholder}
                className="w-full h-12 text-[18px]"
            />
        </View>
    )
}