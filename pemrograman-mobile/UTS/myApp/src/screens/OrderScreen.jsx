import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../tailwind';

const orders = [
    {
        id: 'ORD123',
        product: 'Tenda Kapasitas 4 Orang',
        status: 'Sedang Diproses',
        date: '2025-06-01',
    },
    {
        id: 'ORD124',
        product: 'Kompor Portable + Gas',
        status: 'Sudah Dikirim',
        date: '2025-05-29',
    },
    {
        id: 'ORD125',
        product: 'Matras & Sleeping Bag',
        status: 'Selesai',
        date: '2025-05-25',
    },
];

const OrderScreen = () => {
    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={tw`flex-1 bg-green-50`}>
            <ScrollView contentContainerStyle={tw`p-4`}>
                <Text style={tw`text-xl font-bold text-green-900 mb-4 text-center`}>
                    Riwayat Pemesanan
                </Text>

                {orders.map((order, index) => (
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
                                    : order.status === 'Sudah Dikirim'
                                        ? 'text-yellow-600'
                                        : 'text-red-600'
                                }`}
                        >
                            Status: {order.status}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderScreen;
