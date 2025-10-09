import 'react-native-gesture-handler'
import AppNavigator from "./src/navigation/AppNavigator";
import './global.css'
import { AuthProvider } from '~/contexts/AuthContext';
import { ProductProvider } from '~/contexts/ProductsContext';
import { CartProvider } from '~/contexts/CartContext';
import { FavoritesProvider } from '~/contexts/FavoriteContext';

export default function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <FavoritesProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </FavoritesProvider>
      </ProductProvider>
    </CartProvider>
  );
}
