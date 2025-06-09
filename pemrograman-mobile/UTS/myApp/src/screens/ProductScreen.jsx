import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../tailwind';

const products = [
  {
    id: '1',
    name: 'Tenda 4 Orang',
    price: 'Rp150.000/hari',
    image: require('../../assets/delta.png'),
  },
  {
    id: '2',
    name: 'Kompor Camping',
    price: 'Rp50.000/hari',
    image: require('../../assets/delta.png'),
  },
  {
    id: '3',
    name: 'Sleeping Bag',
    price: 'Rp30.000/hari',
    image: require('../../assets/delta.png'),
  },
  {
    id: '4',
    name: 'Matras Waterproof',
    price: 'Rp20.000/hari',
    image: require('../../assets/delta.png'),
  },
];

const ProductScreen = () => {
  const handleBuy = (productName) => {
    Alert.alert('Pesanan Ditambahkan', `Anda memilih untuk menyewa: ${productName}`);
  };

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-green-50`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <Text style={tw`text-xl font-bold text-green-900 text-center mb-4`}>
          Daftar Produk Camping
        </Text>

        <View style={tw`flex-row flex-wrap justify-between`}>
          {products.map((item) => (
            <View
              key={item.id}
              style={tw`w-[48%] bg-white rounded-xl p-2 mb-4 shadow-md border border-green-200`}
            >
              <Image
                source={item.image}
                style={[tw`rounded-lg mb-2`, { width: '100%', height: 100 }]}
                resizeMode="cover"
              />
              <Text style={tw`text-sm font-bold text-green-800`}>{item.name}</Text>
              <Text style={tw`text-xs text-green-700 mb-2`}>{item.price}</Text>
              <TouchableOpacity
                onPress={() => handleBuy(item.name)}
                style={tw`bg-green-700 py-1 rounded-lg`}
              >
                <Text style={tw`text-white text-center text-xs font-semibold`}>
                  Beli Sekarang
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;