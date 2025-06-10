import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import tw from '../../tailwind';
import { Picker } from '@react-native-picker/picker';
import { getAuth } from 'firebase/auth';

const CheckoutScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { product } = route.params;
    const auth = getAuth();

    // Pastikan product.price adalah number di sini, jika dari Firestore harusnya sudah number
    const initialProductPrice = typeof product?.price === 'number' ? product.price : 0;

    const [address, setAddress] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [delivery, setDelivery] = useState('jne');
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [shippingCost, setShippingCost] = useState(10000);
    const [subtotal, setSubtotal] = useState(initialProductPrice);
    const [total, setTotal] = useState(initialProductPrice + 10000); // Set initial total
    const [isLoading, setIsLoading] = useState(false);

    const couriers = [
        { id: 'jne', name: 'JNE', cost: 10000 },
        { id: 'jnt', name: 'J&T', cost: 12000 },
        { id: 'sicepat', name: 'SiCepat', cost: 15000 },
        { id: 'ninja', name: 'Ninja Xpress', cost: 9000 },
        { id: 'grab', name: 'Grab Express', cost: 20000 },
        { id: 'gosend', name: 'GoSend', cost: 18000 },
    ];

    // Sinkronisasi ongkir saat awal render, dan hitung ulang total
    useEffect(() => {
        const selectedCourier = couriers.find(c => c.id === delivery);
        setShippingCost(selectedCourier?.cost || 10000); // Pastikan ada fallback
        // hitung ulang total juga saat pertama kali component mount
        const newSubtotal = initialProductPrice * quantity;
        setSubtotal(newSubtotal);
        setTotal(newSubtotal + (selectedCourier?.cost || 10000));
    }, []); // Hanya berjalan sekali saat mount

    useEffect(() => {
        const newSubtotal = initialProductPrice * quantity;
        setSubtotal(newSubtotal);
        setTotal(newSubtotal + shippingCost);
    }, [quantity, initialProductPrice, shippingCost]);

    const handleCourierChange = (courierId) => {
        setDelivery(courierId);
        const selectedCourier = couriers.find(c => c.id === courierId);
        setShippingCost(selectedCourier.cost);
    };

    const handleCheckout = async () => {
        if (!address || !receiverName || !phoneNumber) {
            Alert.alert('Error', 'Harap lengkapi semua data pengiriman');
            return;
        }

        if (phoneNumber.length < 10 || phoneNumber.length > 13) {
            Alert.alert('Error', 'Nomor telepon harus antara 10-13 digit');
            return;
        }

        setIsLoading(true);

        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }

            // Generate unique order ID
            const orderRef = doc(collection(db, 'orders'));

            const orderData = {
                id: orderRef.id, // Menyimpan ID dokumen di dalam dokumen itu sendiri
                userId: user.uid,
                product: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    // Menggunakan product.imageUrl dari Firestore (jika ada)
                    // Fallback ke product.image jika imageUrl tidak ada (untuk kompatibilitas lama)
                    imageUrl: product.imageUrl || null
                },
                quantity,
                receiverName,
                phoneNumber,
                address,
                deliveryService: delivery,
                shippingCost,
                subtotal,
                total,
                notes,
                status: 'pending', // Status awal saat checkout
                createdAt: serverTimestamp(), // Gunakan serverTimestamp untuk tanggal pembuatan
                updatedAt: serverTimestamp() // Gunakan serverTimestamp untuk tanggal update
            };

            await setDoc(orderRef, orderData);

            Alert.alert(
                'Order Success',
                'Pesanan berhasil dibuat!',
                [{ text: 'OK', onPress: () => navigation.navigate('MainApp') }]
            );
        } catch (error) {
            console.error('Checkout error:', error);
            Alert.alert('Error', 'Gagal membuat pesanan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const formatCurrency = (amount) => {
        if (isNaN(amount)) return 'Rp0'; // Safety check for NaN
        return amount.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
    };

    return (
        <SafeAreaView edges={['top']} style={tw`flex-1 bg-gray-100`}>
            <ScrollView contentContainerStyle={tw`pb-6`}>
                <Text style={tw`text-xl font-bold text-gray-900 py-4 px-4 bg-white`}>
                    Checkout Pesanan
                </Text>

                {/* Product Section */}
                <View style={tw`bg-white rounded-md mx-4 mt-2 p-4 shadow-sm`}>
                    <Text style={tw`font-bold text-gray-800 mb-3`}>Produk Dipesan</Text>
                    <View style={tw`flex-row items-center`}>
                        {product.imageUrl ? ( // Cek apakah imageUrl ada
                            <Image
                                source={{ uri: product.imageUrl }} // <-- Perubahan di sini
                                style={tw`w-20 h-20 rounded-md mr-3`}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={tw`w-20 h-20 rounded-md mr-3 bg-gray-200 justify-center items-center`}>
                                <Text style={tw`text-gray-500 text-xs`}>No Image</Text>
                            </View>
                        )}
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-gray-800 font-medium`}>{product.name || 'Produk Tidak Dikenal'}</Text>
                            <Text style={tw`text-green-600 font-bold mt-1`}>
                                {formatCurrency(initialProductPrice)}
                            </Text>
                        </View>
                        <View style={tw`flex-row items-center border border-gray-300 rounded-md`}>
                            <TouchableOpacity
                                onPress={decrementQuantity}
                                style={tw`px-3 py-1`}
                            >
                                <Text style={tw`text-lg font-bold`}>-</Text>
                            </TouchableOpacity>
                            <Text style={tw`px-3 py-1`}>{quantity}</Text>
                            <TouchableOpacity
                                onPress={incrementQuantity}
                                style={tw`px-3 py-1`}
                            >
                                <Text style={tw`text-lg font-bold`}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Shipping Address Section */}
                <View style={tw`bg-white rounded-md mx-4 mt-4 p-4 shadow-sm`}>
                    <Text style={tw`font-bold text-gray-800 mb-3`}>Alamat Pengiriman</Text>

                    <Text style={tw`text-gray-700 text-sm mb-1`}>Nama Penerima</Text>
                    <TextInput
                        placeholder="Masukkan nama penerima"
                        style={tw`border border-gray-300 rounded-md px-3 py-2 mb-3`}
                        value={receiverName}
                        onChangeText={setReceiverName}
                    />

                    <Text style={tw`text-gray-700 text-sm mb-1`}>Nomor Telepon</Text>
                    <TextInput
                        placeholder="Masukkan nomor telepon"
                        style={tw`border border-gray-300 rounded-md px-3 py-2 mb-3`}
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />

                    <Text style={tw`text-gray-700 text-sm mb-1`}>Alamat Lengkap</Text>
                    <TextInput
                        placeholder="Masukkan alamat lengkap (jalan, nomor, RT/RW, kecamatan, kota)"
                        style={tw`border border-gray-300 rounded-md px-3 py-2 mb-3 h-20`}
                        multiline
                        value={address}
                        onChangeText={setAddress}
                    />

                    <Text style={tw`text-gray-700 text-sm mb-1`}>Kurir Pengiriman</Text>
                    <View style={tw`border border-gray-300 rounded-md mb-3 overflow-hidden`}>
                        <Picker
                            selectedValue={delivery}
                            onValueChange={handleCourierChange}
                        >
                            {couriers.map(courier => (
                                <Picker.Item
                                    key={courier.id}
                                    label={`${courier.name} (${formatCurrency(courier.cost)})`}
                                    value={courier.id}
                                />
                            ))}
                        </Picker>
                    </View>

                    <Text style={tw`text-gray-700 text-sm mb-1`}>Catatan (Opsional)</Text>
                    <TextInput
                        placeholder="Contoh: Warna item, catatan pengiriman, dll"
                        style={tw`border border-gray-300 rounded-md px-3 py-2 h-16`}
                        multiline
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>

                {/* Payment Summary */}
                <View style={tw`bg-white rounded-md mx-4 mt-4 p-4 shadow-sm`}>
                    <Text style={tw`font-bold text-gray-800 mb-3`}>Ringkasan Pembayaran</Text>

                    <View style={tw`flex-row justify-between mb-1`}>
                        <Text style={tw`text-gray-600`}>Subtotal Produk ({quantity} item)</Text>
                        <Text style={tw`text-gray-800`}>{formatCurrency(subtotal)}</Text>
                    </View>

                    <View style={tw`flex-row justify-between mb-1`}>
                        <Text style={tw`text-gray-600`}>Ongkos Kirim ({couriers.find(c => c.id === delivery)?.name})</Text>
                        <Text style={tw`text-gray-800`}>{formatCurrency(shippingCost)}</Text>
                    </View>

                    <View style={tw`border-t border-gray-200 my-2`} />

                    <View style={tw`flex-row justify-between`}>
                        <Text style={tw`font-bold text-gray-800`}>Total Pembayaran</Text>
                        <Text style={tw`font-bold text-green-600`}>{formatCurrency(total)}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Checkout Button */}
            <View style={tw`px-4 pt-3 pb-5 bg-white border-t border-gray-200`}>
                <View style={tw`flex-row justify-between items-center mb-2`}>
                    <Text style={tw`text-gray-700 font-medium`}>Total:</Text>
                    <Text style={tw`font-bold text-lg text-green-600`}>{formatCurrency(total)}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleCheckout}
                    disabled={isLoading}
                    style={tw`bg-green-600 py-3 rounded-md shadow-md ${isLoading ? 'opacity-50' : ''}`}
                >
                    <Text style={tw`text-white text-center font-bold text-lg`}>
                        {isLoading ? 'Memproses...' : 'Buat Pesanan'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CheckoutScreen;