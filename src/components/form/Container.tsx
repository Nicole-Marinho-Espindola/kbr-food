import React from "react";
import { View } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  height?: string; 
  className?: string;
}

export default function Container({
    className,
    children,     
}: ContainerProps) {

  return (
    <View
      className={`flex items-center bg-white w-full rounded-t-[55px] h-[80%] ${className} pt-20 px-12`}
    >
      {children}
    </View>
  );
}
