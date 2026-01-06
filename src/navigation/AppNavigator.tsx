import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoritesScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Initial from '../screens/Auth/InitialScreen';
import Login from '../screens/Auth/LoginScreen';
import SignUp from '../screens/Auth/SignUpScreen';
import Loading from '../screens/Auth/components/LoadingScreen';
import MainLayout from '~/components/layouts/MainLayout';
import Search from '~/screens/SearchScreen';
import OrdersScreen from '~/screens/OrdersScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Initial" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Loading" component={Loading} />

      <Stack.Screen name="Home">
        {() => (
          <MainLayout>
            <HomeScreen />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Details">
        {() => (
          <MainLayout>
            <DetailsScreen />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Search">
        {() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Favorite">
        {() => (
          <MainLayout>
            <FavoriteScreen />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Cart" component={CartScreen} />

      <Stack.Screen name="Profile">
        {() => (
          <MainLayout>
            <ProfileScreen />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Notifications">
        {() => (
          <MainLayout>
            <NotificationsScreen />
          </MainLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
}
