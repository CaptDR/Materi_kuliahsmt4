import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Gagal', 'Email dan password harus diisi!');
      return;
    }

    setIsLoading(true); // Mulai loading
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // --- PERBAIKAN PENTING: Ubah 'users' menjadi 'user_profiles' ---
      const userDoc = await getDoc(doc(db, 'user_profiles', user.uid));
      // ---------------------------------------------------------------

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User data from Firestore:', userData);

        // Di sini Anda bisa menyimpan userData ke context/state global
        // atau AsyncStorage jika diperlukan untuk diakses di seluruh aplikasi

        Alert.alert('Login Berhasil', 'Selamat datang kembali!');
        navigation.replace('MainApp'); // Arahkan ke halaman utama setelah login berhasil
      } else {
        // Ini seharusnya tidak terjadi jika signup sudah berhasil membuat profil
        // Namun, sebagai fallback atau jika ada user yang hanya terdaftar di Auth
        // tanpa data profil di Firestore (misal, dari versi lama aplikasi).
        Alert.alert('Peringatan', 'Profil pengguna tidak lengkap di Firestore. Membuat profil dasar.');
        // Opsional: Buat profil dasar jika tidak ditemukan
        const initialProfileData = {
          uid: user.uid,
          email: user.email,
          username: user.displayName || '', // Ambil dari Auth displayName
          fullName: user.displayName || '',
          phoneNumber: '',
          defaultAddress: {},
          notificationPreferences: {
            orderUpdates: true,
            promotions: false,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await setDoc(doc(db, 'user_profiles', user.uid), initialProfileData);
        navigation.replace('MainApp');
      }
    } catch (error) {
      console.error('Login Error:', error);
      let errorMessage = 'Terjadi kesalahan saat login. Silakan coba lagi.';
      if (error.code === 'auth/invalid-credential') { // Kode umum untuk email/password salah
        errorMessage = 'Email atau password salah.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Pengguna tidak ditemukan.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Password salah.';
      }
      Alert.alert('Gagal Login', errorMessage);
    } finally {
      setIsLoading(false); // Hentikan loading
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#153932] justify-center px-6`}>
      <ScrollView contentContainerStyle={tw`flex-grow justify-center`}>
        <Image
          source={require('../../assets/delta.png')}
          style={tw`w-24 h-24 self-center mb-6`}
        />
        <Text style={tw`text-white text-3xl font-bold mb-8 text-center`}>Masuk Akun</Text>

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
            <Text style={tw`text-white ml-2`}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={tw`bg-[#f6b042] py-4 rounded-xl items-center mt-2 ${isLoading ? 'opacity-50' : ''}`}
          onPress={handleLogin}
          disabled={isLoading} // Nonaktifkan tombol saat loading
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" /> // Tampilkan loading spinner
          ) : (
            <Text style={tw`text-white font-bold text-lg`}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={tw`mt-4`}
        >
          <Text style={tw`text-center text-[#f6b042] text-base`}>
            Belum punya akun? <Text style={tw`font-bold`}>Daftar Sekarang</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}