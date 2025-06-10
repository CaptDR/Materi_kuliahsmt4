import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignupScreen';
import HomeMain from './src/screens/HomeScreen';
import ProdukScreen from './src/screens/ProductScreen';
import CheckoutScreen from './src/screens/CheckoutScreen'; // ✅ PASTIKAN INI ADA
import RiwayatScreen from './src/screens/OrderScreen';
import ProfilScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingScreen';

// Custom drawer
import CustomDrawer from './src/components/CustomDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer routes setelah login
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: { fontSize: 16 },
      }}
      initialRouteName="HomeMain"
    >
      <Drawer.Screen
        name="HomeMain"
        component={HomeMain}
        options={{ drawerLabel: 'Beranda' }}
      />
      <Drawer.Screen
        name="Produk"
        component={ProdukScreen}
        options={{ drawerLabel: 'Produk' }}
      />
      <Drawer.Screen
        name="Riwayat"
        component={RiwayatScreen}
        options={{ drawerLabel: 'Riwayat' }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfilScreen}
        options={{ drawerLabel: 'Profil' }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerLabel: 'Pengaturan' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {/* Auth screens */}
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Setelah login */}
        <Stack.Screen
          name="MainApp"
          component={DrawerRoutes}
          options={{ gestureEnabled: false }}
        />

        {/* ✅ Tambahkan ini agar CheckoutScreen bisa dipanggil */}
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
