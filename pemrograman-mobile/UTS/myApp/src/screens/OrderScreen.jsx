import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../tailwind';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebaseConfig';

const OrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const orderList = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const orderId = doc.id;

                    // --- DEBUGGING TANGGAL LEBIH LANJUT ---
                    console.log(`[OrderScreen Debug] Order ID: ${orderId}`);
                    console.log(`[OrderScreen Debug] Raw date data:`, data.date);
                    console.log(`[OrderScreen Debug] Type of data.date:`, typeof data.date);

                    if (data.date) {
                        // Periksa apakah ini objek Timestamp Firestore
                        if (typeof data.date.toDate === 'function') {
                            console.log(`[OrderScreen Debug] data.date is a Firestore Timestamp object.`);
                            try {
                                const dateObject = data.date.toDate();
                                console.log(`[OrderScreen Debug] Converted Date object:`, dateObject);
                                console.log(`[OrderScreen Debug] Formatted date:`, dateObject.toLocaleDateString('id-ID'));
                            } catch (e) {
                                console.error(`[OrderScreen Debug] Error converting Timestamp to Date for Order ID ${orderId}:`, e);
                            }
                        } else {
                            console.warn(`[OrderScreen Debug] data.date for Order ID ${orderId} is NOT a Firestore Timestamp object. Its type is:`, typeof data.date);
                            // Jika Anda yakin ini string tapi Firestore bilang timestamp, mungkin ada transpilation issue
                            if (typeof data.date === 'string') {
                                try {
                                    const dateObject = new Date(data.date);
                                    if (!isNaN(dateObject.getTime())) { // Check if it's a valid date
                                        console.log(`[OrderScreen Debug] Data.date is a string, successfully parsed to Date:`, dateObject);
                                    } else {
                                        console.log(`[OrderScreen Debug] Data.date is a string, but invalid date.`);
                                    }
                                } catch (e) {
                                    console.error(`[OrderScreen Debug] Error parsing string date for Order ID ${orderId}:`, e);
                                }
                            }
                        }
                    } else {
                        console.log(`[OrderScreen Debug] data.date for Order ID ${orderId} is null or undefined.`);
                    }
                    // ----------------------------------------

                    return {
                        id: orderId,
                        ...data,
                    };
                });
                setOrders(orderList);
                setLoading(false);
            });

            return () => unsubscribe();
        } else {
            setLoading(false); // Jika tidak ada user, hentikan loading
        }
    }, []);

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={tw`flex-1 bg-green-50`}>
            <ScrollView contentContainerStyle={tw`p-4`}>
                <Text style={tw`text-xl font-bold text-green-900 mb-4 text-center`}>
                    Riwayat Pemesanan
                </Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#153932" />
                ) : orders.length === 0 ? (
                    <Text style={tw`text-center text-green-800`}>Belum ada pesanan</Text>
                ) : (
                    orders.map((order, index) => (
                        <View
                            key={index}
                            style={tw`bg-white rounded-xl p-4 mb-3 shadow-md border border-green-200`}
                        >
                            <Text style={tw`text-green-800 font-semibold`}>
                                {order.product?.name || 'Nama Produk Tidak Tersedia'}
                            </Text>
                            <Text style={tw`text-sm text-green-600`}>
                                ID Pesanan: {order.id}
                            </Text>
                            <Text style={tw`text-sm text-green-600`}>
                                Tanggal: {
                                    order.date && typeof order.date.toDate === 'function'
                                        ? order.date.toDate().toLocaleDateString('id-ID')
                                        : 'Tanggal tidak tersedia'
                                }
                            </Text>
                            <Text
                                style={tw`text-sm font-bold mt-2 ${order.status === 'Selesai'
                                    ? 'text-green-700'
                                    : order.status === 'Dikirim'
                                        ? 'text-yellow-600'
                                        : 'text-red-600'}
                                `}
                            >
                                Status: {order.status}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderScreen;