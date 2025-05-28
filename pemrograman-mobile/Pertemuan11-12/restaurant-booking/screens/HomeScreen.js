// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export default function HomeScreen({ navigation }) {
    return (
        <View style={tw`flex-1 justify-center items-center bg-white`}>
            <Text style={tw`text-2xl font-bold mb-4`}>Restaurant Booking</Text>
            <TouchableOpacity
                style={tw`bg-blue-500 p-4 rounded-lg mb-4`}
                onPress={() => navigation.navigate('Booking')}
            >
                <Text style={tw`text-white text-lg`}>Make a Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`bg-green-500 p-4 rounded-lg`}
                onPress={() => navigation.navigate('BookingList')}
            >
                <Text style={tw`text-white text-lg`}>View Bookings</Text>
            </TouchableOpacity>

        </View>
    );
}