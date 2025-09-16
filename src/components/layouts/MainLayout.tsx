import { ScrollView, View } from "react-native";
import TabButtons from "../TabButtons";

export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <View>
            <ScrollView className="min-h-screen text-lightGray pt-14">
                {children}
            </ScrollView>
            <TabButtons />
        </View>
    );
}
