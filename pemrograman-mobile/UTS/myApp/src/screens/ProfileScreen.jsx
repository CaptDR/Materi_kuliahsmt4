import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import tw from '../../tailwind';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-green-50`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Header Profile */}
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={tw`items-center mb-6`}
        >
          <Image
            source={require('../../assets/delta.png')}
            style={tw`w-24 h-24 rounded-full mb-2`}
          />
          <Text style={tw`text-xl font-bold text-green-900`}>DELTAROMEO</Text>
          <Text style={tw`text-sm text-green-700`}>deltaromeo@gmail.com</Text>
        </Animated.View>

        {/* Informasi Akun */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={tw`bg-white rounded-xl p-4 shadow-md mb-4`}
        >
          <Text style={tw`text-base font-bold text-green-800 mb-2`}>Informasi Akun</Text>
          <Text style={tw`text-sm text-green-700`}>Nomor HP: 0812-xxxx-xxxx</Text>
          <Text style={tw`text-sm text-green-700`}>Alamat: Bandung, Jawa Barat</Text>
        </Animated.View>

        {/* Menu */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(500)}
          style={tw`bg-white rounded-xl p-2 shadow-md`}
        >
          <MenuItem icon="person" label="Ubah Profil" onPress={() => console.log('Ubah Profil ditekan')} />
          <MenuItem icon="history" label="Riwayat Pesanan" onPress={() => console.log('Riwayat Pesanan ditekan')} />

          {/* Navigasi ke Settings dengan getParent */}
          <MenuItem
            icon="settings"
            label="Pengaturan Akun"
            onPress={() => navigation.getParent()?.navigate('Settings')}
          />

          <MenuItem icon="moon" label="Mode Gelap" onPress={() => console.log('Mode Gelap ditekan')} />
          <MenuItem icon="log-out" label="Keluar" isLogout onPress={() => console.log('Keluar ditekan')} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, label, isLogout = false, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center p-3 border-b border-green-100`}
    >
      <Ionicons
        name={icon}
        size={20}
        color={isLogout ? '#dc2626' : '#065f46'}
        style={tw`mr-3`}
      />
      <Text
        style={[
          tw`text-base`,
          isLogout ? tw`text-red-600 font-bold` : tw`text-green-900`,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileScreen;
