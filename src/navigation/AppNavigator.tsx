import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import Initial from '../screens/Auth/InitialScreen';
import Login from '../screens/Auth/LoginScreen';
import SignUp from '../screens/Auth/SignUpScreen';
import Loading from '../screens/Auth/components/LoadingScreen';
import MainLayout from '~/components/layouts/MainLayout';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return(
        <NavigationContainer>
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

                <Stack.Screen name="Cart">
                    {() => (
                    <MainLayout>
                        <CartScreen />
                    </MainLayout>
                    )}
                </Stack.Screen>

                <Stack.Screen name="Profile">
                    {() => (
                    <MainLayout>
                        <ProfileScreen />
                    </MainLayout>
                    )}
                </Stack.Screen>

                <Stack.Screen name="Confirmation">
                    {() => (
                    <MainLayout>
                        <ConfirmationScreen />
                    </MainLayout>
                    )}
                </Stack.Screen>

            </Stack.Navigator>

        </NavigationContainer>
    )
}