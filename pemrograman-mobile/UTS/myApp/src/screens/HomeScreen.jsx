import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HomeMain from './HomeMain';
import ProductScreen from './ProductScreen';
import OrderScreen from './OrderScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="HomeMain"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ffff', // warna tema Deltaromeo Outdoor
        tabBarInactiveTintColor: '#f6b042',
        tabBarStyle: {
          backgroundColor: '#153932',
          borderTopWidth: 0,
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
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
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="HomeMain" component={HomeMain} options={{ title: 'Home' }} />
      <Tab.Screen name="Produk" component={ProductScreen} />
      <Tab.Screen name="Notifikasi" component={OrderScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}