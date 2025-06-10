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
                const orderList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(orderList);
                setLoading(false);
            });

            return () => unsubscribe();
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
                                {order.product}
                            </Text>
                            <Text style={tw`text-sm text-green-600`}>
                                ID Pesanan: {order.id}
                            </Text>
                            <Text style={tw`text-sm text-green-600`}>
                                Tanggal: {order.date}
                            </Text>
                            <Text
                                style={tw`text-sm font-bold mt-2 ${order.status === 'Selesai'
                                    ? 'text-green-700'
                                    : order.status === 'Dikirim'
                                        ? 'text-yellow-600'
                                        : 'text-red-600'
                                    }`}
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
