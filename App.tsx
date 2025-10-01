import 'react-native-gesture-handler'
import AppNavigator from "./src/navigation/AppNavigator";
import './global.css'
import { AuthProvider } from '~/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
