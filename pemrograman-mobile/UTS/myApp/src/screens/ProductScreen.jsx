import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../tailwind';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; // addDoc dihapus
import { db } from '../../firebaseConfig';

const ProductScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount) => {
    if (isNaN(amount)) return 'Rp0';
    return amount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    });
  };

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('name', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
      console.log("Produk berhasil dimuat dari Firestore:", productList.length);
    }, (error) => {
      console.error("Error fetching products from Firestore:", error);
      Alert.alert("Error", "Gagal memuat daftar produk dari server.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleBuy = (product) => { // Tidak perlu async lagi karena tidak ada operasi Firestore
    const user = auth.currentUser;

    if (!user) {
      Alert.alert(
        'Login Required',
        'Anda perlu login terlebih dahulu untuk melakukan pembelian',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => navigation.navigate('Login') }
        ]
      );
      return;
    }

    // --- Perubahan Utama di sini ---
    // HANYA navigasi ke CheckoutScreen dengan membawa data produk
    // Tidak ada lagi pembuatan dokumen pesanan awal di sini
    navigation.navigate('Checkout', {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || null, // Pastikan imageUrl ada
        stock: product.stock // Penting untuk dibawa ke checkout
      },
      // orderId tidak lagi diteruskan karena pesanan belum dibuat
    });
  };

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-green-50`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <Text style={tw`text-xl font-bold text-green-900 text-center mb-4`}>
          Daftar Produk Camping
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#153932" style={tw`mt-20`} />
        ) : products.length === 0 ? (
          <Text style={tw`text-center text-gray-700 mt-20`}>Belum ada produk tersedia.</Text>
        ) : (
          <View style={tw`flex-row flex-wrap justify-between`}>
            {products.map((item) => (
              <View
                key={item.id}
                style={tw`w-[48%] bg-white rounded-xl p-2 mb-4 shadow-md border border-green-200`}
              >
                {item.imageUrl ? (
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={[tw`rounded-lg mb-2`, { width: '100%', height: 100 }]}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[tw`rounded-lg mb-2 bg-gray-200 justify-center items-center`, { width: '100%', height: 100 }]}>
                    <Text style={tw`text-gray-500 text-xs`}>No Image</Text>
                  </View>
                )}

                <Text style={tw`text-sm font-bold text-green-800`}>{item.name}</Text>
                <Text style={tw`text-xs text-green-700 mb-2`}>
                  {formatCurrency(item.price)}
                </Text>
                <Text style={tw`text-xs text-gray-500 mb-2`}>Stok: {item.stock}</Text>
                <TouchableOpacity
                  onPress={() => handleBuy(item)}
                  style={tw`bg-green-700 py-1 rounded-lg`}
                >
                  <Text style={tw`text-white text-center text-xs font-semibold`}>
                    Beli Sekarang
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;