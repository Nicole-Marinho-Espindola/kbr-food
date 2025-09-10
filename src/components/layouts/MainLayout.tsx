import { View } from "react-native";
import TabButtons from "../TabButtons";

export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <View className="text-lightGray">
            <View>
                {children}
            </View>
            <TabButtons />
        </View>
    );
}
