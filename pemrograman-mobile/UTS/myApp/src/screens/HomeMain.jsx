import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import tw from 'twrnc';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig'; // Pastikan path ini sesuai dengan konfigurasi firebase Anda

const { width } = Dimensions.get('window');

const HomeMain = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUsername(data.username || data.name || 'Pengguna');
          } else {
            setUsername('Pengguna');
          }
        } catch (error) {
          console.log('Error fetching user data:', error);
          setUsername('Pengguna');
        }
      } else {
        setUsername(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#f0fdf4]`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Header with Username */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-xl font-semibold text-green-900 text-center`}>
            {username ? `Halo, ${username}!` : 'Selamat Datang di Deltaromeo Outdoor!'}
          </Text>
          {!username && (
            <Text style={tw`text-base text-green-700 text-center mt-1`}>
              Sahabat Petualanganmu 🌄
            </Text>
          )}
        </View>

        {/* Show subtitle only if username exists */}
        {username && (
          <Text style={tw`text-base text-green-700 text-center mb-4`}>
            Sahabat Petualanganmu 🌄
          </Text>
        )}

        <Image
          source={require('../../assets/delta.png')}
          style={{
            width: width * 0.9,
            height: width * 1.0,
            alignSelf: 'center',
            marginVertical: 10,
          }}
          resizeMode="contain"
        />

        {/* Promo Spesial */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold text-green-800 mb-2`}>
            Promo Spesial Minggu Ini!
          </Text>
          <View style={tw`bg-green-200 p-4 rounded-2xl shadow-md`}>
            <Text style={tw`text-base font-bold text-green-900`}>
              🎉 Diskon 25% Alat Camping
            </Text>
            <Text style={tw`text-sm text-green-800 mt-1`}>
              Dapatkan promo hingga akhir pekan ini!
            </Text>
          </View>
        </View>

        {/* Benefit Section */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold text-green-800 mb-2`}>
            Kenapa Deltaromeo Outdoor?
          </Text>
          {[
            '✅ Produk Berkualitas Tinggi',
            '✅ Harga Terjangkau',
            '✅ Layanan Pelanggan Ramah',
            '✅ Cocok untuk Semua Jenis Petualangan',
          ].map((benefit, index) => (
            <Text key={index} style={tw`text-sm text-green-700 my-1`}>
              {benefit}
            </Text>
          ))}
        </View>

        {/* Gambar Tambahan */}
        <Image
          source={require('../../assets/2.png')}
          style={{
            width: width * 0.9,
            height: width * 1.0,
            alignSelf: 'center',
            marginVertical: 10,
          }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/3.png')}
          style={{
            width: width * 0.9,
            height: width * 1.0,
            alignSelf: 'center',
            marginBottom: 30,
          }}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeMain;