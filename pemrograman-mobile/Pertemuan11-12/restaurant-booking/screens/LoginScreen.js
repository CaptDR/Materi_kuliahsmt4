import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import tw from 'twrnc';

export default function LoginScreen({ navigation }) {
    const onGoogleButtonPress = async () => {
        try {
            // Get the user's ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);

            Alert.alert('Login Sukses', 'Anda berhasil login');
            navigation.replace('Home'); // Ganti dengan nama screen utama setelah login
        } catch (error) {
            console.error(error);
            Alert.alert('Login Gagal', error.message);
        }
    };

    return (
        <View style={tw`flex-1 justify-center items-center bg-white px-6`}>
            <Text style={tw`text-3xl font-bold mb-8`}>Login</Text>

            <TouchableOpacity
                onPress={onGoogleButtonPress}
                style={tw`bg-blue-500 px-5 py-3 rounded-lg`}
            >
                <Text style={tw`text-white text-base font-medium`}>Login dengan Google</Text>
            </TouchableOpacity>
        </View>
    );
}