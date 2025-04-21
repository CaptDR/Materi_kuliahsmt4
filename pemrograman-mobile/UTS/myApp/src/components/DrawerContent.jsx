import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DrawerContent(props) {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode((prev) => !prev);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* FOTO & NAMA USER */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/delta.png')} // sesuaikan path
          style={styles.avatar}
        />
        <Text style={styles.username}>Nama Pengguna</Text>
      </View>

      {/* Navigasi Otomatis */}
      <DrawerItemList {...props} />

      {/* DARK MODE SWITCH */}
      <View style={styles.switchContainer}>
        <Ionicons name="moon" size={24} color="#fff" />
        <Text style={styles.switchText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleSwitch}
          thumbColor={isDarkMode ? '#ff8c00' : '#ccc'}
        />
      </View>

      {/* TOMBOL SETTINGS */}
      <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.menuItem}>
        <Ionicons name="settings-outline" size={24} color="#fff" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      {/* TOMBOL LOGOUT */}
      <TouchableOpacity onPress={() => alert('Logout berhasil!')} style={styles.menuItem}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#065f46',
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  menuText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    justifyContent: 'space-between',
  },
  switchText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
});