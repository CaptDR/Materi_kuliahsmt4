import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setStoredUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Gagal mengambil data user:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    if (
      storedUser &&
      username === storedUser.username &&
      password === storedUser.password
    ) {
      navigation.navigate('MainApp'); // pastikan 'Home' sesuai dengan nama screen di navigator
    } else {
      Alert.alert('Gagal', 'Username atau password salah!');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/delta.png')} style={styles.logo} />
      <Text style={styles.title}>Masuk Akun</Text>
      
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#aaa"
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 24,
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