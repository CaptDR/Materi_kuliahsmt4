// src/components/CustomDrawer.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Text style={styles.username}>Nama Pengguna</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomDrawer;