import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tw from 'twrnc';

import HomeMain from './HomeMain';
import ProductScreen from './ProductScreen';
import OrderScreen from './OrderScreen';
import ProfileScreen from './ProfileScreen';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="HomeMain"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ffff', // warna tema Deltaromeo Outdoor (putih)
        tabBarInactiveTintColor: '#f6b042', // warna kuning keemasan
        tabBarStyle: [
          tw`bg-[#153932]`, // hijau tua khas Deltaromeo
          {
            borderTopWidth: 0,
            height: 65,
            paddingBottom: 10,
            paddingTop: 5,
          },
        ],
        tabBarLabelStyle: tw`text-[12px] font-semibold`,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeMain') {
            iconName = 'home';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Produk') {
            iconName = 'shopping-bag';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Notifikasi') {
            iconName = 'notifications';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profil') {
            iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="HomeMain"
        component={HomeMain}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Produk"
        component={ProductScreen}
      />
      <Tab.Screen
        name="Notifikasi"
        component={OrderScreen}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}