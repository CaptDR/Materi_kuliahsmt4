import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import tw from 'twrnc';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert('Gagal', 'Semua field harus diisi!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username,
        email,
        createdAt: new Date(),
      });

      Alert.alert('Sukses', 'Akun berhasil dibuat!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Gagal Daftar', error.message);
    }
  };

  return (
    <View style={tw`flex-1 bg-[#153932] justify-center px-6`}>
      <Text style={tw`text-white text-2xl mb-4 text-center`}>Buat Akun Baru</Text>

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

      <TouchableOpacity style={tw`bg-[#f6b042] py-4 rounded-xl items-center mt-2`} onPress={handleSignup}>
        <Text style={tw`text-white font-bold`}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}