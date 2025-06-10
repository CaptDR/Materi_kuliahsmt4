import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, Alert
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig'; // sesuaikan path
import tw from 'twrnc';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Gagal', 'Email dan password harus diisi!');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Bisa simpan ke state global, context, atau AsyncStorage jika perlu
        console.log('User data:', userData);

        navigation.navigate('MainApp'); // arahkan ke halaman utama
      } else {
        Alert.alert('Gagal', 'Data pengguna tidak ditemukan di Firestore!');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Gagal Login', error.message);
    }
  };

  return (
    <View style={tw`flex-1 bg-[#153932] justify-center px-6`}>
      <Image
        source={require('../../assets/delta.png')}
        style={tw`w-24 h-24 self-center mb-6`}
      />
      <Text style={tw`text-white text-2xl mb-4 text-center`}>Masuk Akun</Text>

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
        style={tw`bg-[#f6b042] py-4 rounded-xl items-center mt-2`}
        onPress={handleLogin}
      >
        <Text style={tw`text-white font-bold`}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}