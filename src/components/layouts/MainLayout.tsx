import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import TabButtons from "../TabButtons";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingTop: 56 }} 
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
      <TabButtons />
    </KeyboardAvoidingView>
  );
}
