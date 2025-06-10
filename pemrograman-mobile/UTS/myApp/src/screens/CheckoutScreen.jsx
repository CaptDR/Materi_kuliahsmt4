import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import tw from '../../tailwind';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product, orderId } = route.params;

  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState('');

  const handleConfirm = async () => {
    if (!address || !delivery) {
      Alert.alert('Isi semua data terlebih dahulu');
      return;
    }

    try {
      await updateDoc(doc(db, 'orders', orderId), {
        address,
        delivery,
        status: 'Menunggu Pembayaran',
      });

      Alert.alert('Sukses', 'Pesanan berhasil dibuat!');
      navigation.navigate('HomeMain');
    } catch (error) {
      console.error(error);
      Alert.alert('Gagal', 'Gagal menyimpan data checkout');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-green-50 p-4`}>
      <Text style={tw`text-xl font-bold text-green-900 mb-4 text-center`}>
        Checkout Pesanan
      </Text>

      <View style={tw`bg-white rounded-xl p-4 shadow-md border border-green-200`}>
        <Text style={tw`font-bold text-green-800 mb-2`}>
          Produk: {product.name}
        </Text>
        <Text style={tw`text-green-700 mb-4`}>Harga: {product.price}</Text>

        <Text style={tw`text-green-800 mb-1`}>Alamat Pengiriman</Text>
        <TextInput
          placeholder="Masukkan alamat lengkap"
          style={tw`border border-green-300 rounded-lg px-3 py-2 mb-4`}
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <Text style={tw`text-green-800 mb-1`}>Jasa Pengiriman</Text>
        <TextInput
          placeholder="Contoh: JNE, J&T, Grab, dll"
          style={tw`border border-green-300 rounded-lg px-3 py-2 mb-4`}
          value={delivery}
          onChangeText={setDelivery}
        />

        <TouchableOpacity
          onPress={handleConfirm}
          style={tw`bg-green-700 py-2 rounded-lg`}
        >
          <Text style={tw`text-white text-center font-semibold`}>Konfirmasi Pesanan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
