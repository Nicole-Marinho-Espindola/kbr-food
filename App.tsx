import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AppNavigator from "./src/navigation/AppNavigator";
import './global.css';
import { AuthProvider } from '~/contexts/AuthContext';
import { ProductProvider } from '~/contexts/ProductsContext';
import { CartProvider } from '~/contexts/CartContext';
import { FavoritesProvider } from '~/contexts/FavoriteContext';
import * as Notifications from "expo-notifications";
import { userPushPromotion } from '~/hooks/UsePushPromotion';
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";

export default function App() {
  const navigationRef = useNavigationContainerRef<any>();

  useEffect(() => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

    const interval = setInterval(userPushPromotion, 5 * 60 * 1000);
    userPushPromotion();

    const subscription = Notifications.addNotificationResponseReceivedListener(() => {
      if (navigationRef.isReady()) {
        navigationRef.navigate("Home");
      }
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  return (
    <CartProvider>
      <ProductProvider>
        <FavoritesProvider>
          <AuthProvider>
            <NavigationContainer ref={navigationRef}>
              <AppNavigator />
            </NavigationContainer>
          </AuthProvider>
        </FavoritesProvider>
      </ProductProvider>
    </CartProvider>
  );
}
