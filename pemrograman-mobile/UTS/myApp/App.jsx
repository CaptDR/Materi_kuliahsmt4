import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProdukScreen from './src/screens/ProductScreen';
import RiwayatScreen from './src/screens/OrderScreen';
import ProfilScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingScreen';
import CustomDrawer from './src/components/CustomDrawer';
import HomeMain from './src/screens/HomeMain';
import DrawerContent from './src/components/DrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator hanya muncul setelah login
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#000',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Produk" component={ProdukScreen} />
      <Drawer.Screen name="Riwayat" component={RiwayatScreen} />
      <Drawer.Screen name="Profil" component={ProfilScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Drawer" component={DrawerContent} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainApp" component={DrawerRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
