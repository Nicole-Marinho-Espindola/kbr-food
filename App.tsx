import 'react-native-gesture-handler'
import AppNavigator from "./src/navigation/AppNavigator";
import './global.css'
import { AuthProvider } from '~/contexts/AuthContext';
import { ProductProvider } from '~/contexts/ProductsContext';

export default function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ProductProvider>
  );
}
