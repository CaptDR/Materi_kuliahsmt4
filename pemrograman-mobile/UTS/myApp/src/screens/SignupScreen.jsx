import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import tw from 'twrnc';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert('Gagal', 'Semua field harus diisi!');
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Opsional: Update display name di Firebase Auth
      await updateProfile(user, { displayName: username });

      // --- Bagian Penting: Buat dokumen user_profiles di Firestore ---
      const userProfileRef = doc(db, 'user_profiles', user.uid);
      await setDoc(userProfileRef, {
        uid: user.uid,
        email: user.email,
        username: username,
        fullName: username,
        phoneNumber: '',
        defaultAddress: {},
        notificationPreferences: {
          orderUpdates: true,
          promotions: false,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // ------------------------------------------------------------------

      Alert.alert('Sukses', 'Akun berhasil dibuat! Silakan login dengan akun baru Anda.');
      // --- Perubahan di sini: Navigasi ke LoginScreen ---
      navigation.replace('Login'); // Menggunakan replace agar SignupScreen tidak bisa di-back
    } catch (error) {
      console.error('Signup error:', error.message);
      let errorMessage = 'Terjadi kesalahan saat pendaftaran. Silakan coba lagi.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email ini sudah terdaftar. Gunakan email lain atau login.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Format email tidak valid.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password terlalu lemah (minimal 6 karakter).';
      }
      Alert.alert('Gagal Daftar', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#153932] justify-center px-6`}>
      <ScrollView contentContainerStyle={tw`flex-grow justify-center`}>
        <Text style={tw`text-white text-3xl font-bold mb-8 text-center`}>Buat Akun Baru</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#aaa"
          style={tw`bg-[#1c2b3a] text-white px-4 py-3 mb-3 rounded-xl`}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          style={tw`bg-[#1c2b3a] text-white px-4 py-3 mb-3 rounded-xl`}
        />
        <View style={tw`flex-row items-center bg-[#1c2b3a] rounded-xl px-4 mb-3`}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#aaa"
            style={tw`flex-1 text-white py-3`}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={tw`text-white`}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={tw`bg-[#f6b042] py-4 rounded-xl items-center mt-2 ${isLoading ? 'opacity-50' : ''}`}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={tw`text-white font-bold text-lg`}>Daftar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={tw`mt-4`}
        >
          <Text style={tw`text-center text-[#f6b042] text-base`}>
            Sudah punya akun? <Text style={tw`font-bold`}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}