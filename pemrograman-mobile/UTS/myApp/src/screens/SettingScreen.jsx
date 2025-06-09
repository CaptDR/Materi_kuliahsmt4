import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import tw from '../../tailwind';

const SettingScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-green-50`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={tw`mb-6`}>
          <Text style={tw`text-2xl font-bold text-green-900`}>Pengaturan Akun</Text>
          <Text style={tw`text-green-700 mt-1`}>Kelola preferensi aplikasi Anda</Text>
        </Animated.View>

        {/* Bahasa */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(400)}
          style={tw`bg-white rounded-xl p-4 shadow-md mb-4`}
        >
          <Text style={tw`text-green-800 font-semibold mb-2`}>Bahasa</Text>
          <TouchableOpacity
            style={tw`flex-row justify-between items-center`}
            onPress={() => alert('Fitur ganti bahasa belum tersedia')}
          >
            <Text style={tw`text-green-700`}>Bahasa Indonesia</Text>
            <Ionicons name="chevron-forward" size={20} color="#065f46" />
          </TouchableOpacity>
        </Animated.View>

        {/* Notifikasi */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(400)}
          style={tw`bg-white rounded-xl p-4 shadow-md mb-4 flex-row justify-between items-center`}
        >
          <Text style={tw`text-green-800 font-semibold`}>Notifikasi</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#a7f3d0', true: '#065f46' }}
            thumbColor={notificationsEnabled ? '#065f46' : '#9ca3af'}
          />
        </Animated.View>

        {/* Mode Gelap */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(400)}
          style={tw`bg-white rounded-xl p-4 shadow-md mb-4 flex-row justify-between items-center`}
        >
          <Text style={tw`text-green-800 font-semibold`}>Mode Gelap</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#a7f3d0', true: '#065f46' }}
            thumbColor={isDarkMode ? '#065f46' : '#9ca3af'}
          />
        </Animated.View>

        {/* Logout */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(400)}
          style={tw`bg-white rounded-xl p-4 shadow-md`}
        >
          <TouchableOpacity
            style={tw`flex-row items-center justify-center py-3 border border-red-600 rounded-lg`}
            onPress={() => alert('Logout ditekan')}
          >
            <Ionicons name="log-out-outline" size={20} color="#dc2626" style={tw`mr-2`} />
            <Text style={tw`text-red-600 font-bold`}>Keluar Akun</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;
