import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import tw from 'twrnc';

export default function BookingListScreen() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);
  const fetchBookings = async () => {
    try {
      const q = query(collection(db, 'bookings'), orderBy('date', 'asc'));
      const querySnapshot = await getDocs(q);
      const bookingsList = [];
      querySnapshot.forEach((doc) => {
        bookingsList.push({ id: doc.id, ...doc.data() });
      });
      setBookings(bookingsList);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  const renderBookingItem = ({ item }) => (
    <View style={tw`bg-white p-4 mb-2 rounded-lg shadow`}>
      <Text style={tw`text-lg font-bold mb-1`}>{item.name}</Text>
      <View style={tw`flex-row justify-between`}>
        <View>
          <Text style={tw`text-gray-600`}>Date: {item.date}</Text>
          <Text style={tw`text-gray-600`}>Time: {item.time}</Text>
        </View>
        <View style={tw`bg-blue-100 px-3 py-1 rounded-full`}>
          <Text style={tw`text-blue-800`}>{item.guests} guests</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Booking List</Text>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={fetchBookings}
      />
    </View>
  );
}