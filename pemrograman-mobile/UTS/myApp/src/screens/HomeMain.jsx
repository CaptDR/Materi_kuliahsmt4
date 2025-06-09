import React from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import tw from '../../tailwind';

const { width } = Dimensions.get('window');

const HomeMain = () => {
  return (
    <SafeAreaView style={tw`bg-green-50 flex-1`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        <Text style={tw`text-2xl font-bold text-green-900 text-center mb-2`}>
          Selamat Datang di Deltaromeo Outdoor!
        </Text>
        <Text style={tw`text-base text-green-700 text-center mb-4`}>
          Sahabat Petualanganmu 🌄
        </Text>

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

        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold text-green-800 mb-2`}>
            Promo Spesial Minggu Ini!
          </Text>
          <View style={tw`bg-green-200 p-4 rounded-xl`}>
            <Text style={tw`text-base font-bold text-green-900`}>
              Diskon 25% Alat Camping
            </Text>
            <Text style={tw`text-sm text-green-800`}>
              Dapatkan promo hingga akhir pekan ini!
            </Text>
          </View>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold text-green-800 mb-2`}>
            Kenapa Deltaromeo Outdoor?
          </Text>
          {[
            '✅ Produk Berkualitas Tinggi',
            '✅ Harga Terjangkau',
            '✅ Layanan Pelanggan Ramah',
            '✅ Cocok untuk Semua Jenis Petualangan',
          ].map((benefit, i) => (
            <Text key={i} style={tw`text-sm text-green-700 my-1`}>{benefit}</Text>
          ))}
        </View>

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