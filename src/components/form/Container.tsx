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
    height = "h-[85vh]",      
}: ContainerProps) {

  return (
    <View
      className={`absolute flex items-center bg-white w-full rounded-[55px] ${height} ${className} pt-20 px-12`}
    >
      {children}
    </View>
  );
}
