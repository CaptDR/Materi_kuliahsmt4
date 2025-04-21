import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const userData = { username, email, password };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Sukses', 'Akun berhasil dibuat!');
      navigation.navigate('Start'); // Kembali ke StartScreen
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat menyimpan data!');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Akun Baru</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.inputPassword}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ color: '#fff' }}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#153932',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1c2b3a',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c2b3a',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputPassword: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#f6b042',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});