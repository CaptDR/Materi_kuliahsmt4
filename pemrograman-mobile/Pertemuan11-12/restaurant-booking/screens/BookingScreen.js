import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Platform, TouchableOpacity, Pressable } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';

export default function BookingScreen({ navigation }) {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [guests, setGuests] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const formatTime = (time) => {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleBooking = async () => {
        if (!name || !date || !time || !guests) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            await addDoc(collection(db, 'bookings'), {
                name,
                date: formatDate(date),
                time: formatTime(time),
                guests: parseInt(guests),
            });
            Alert.alert('Success', 'Booking made successfully');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Failed to make booking');
        }
    };

    const incrementGuests = () => {
        const currentGuests = parseInt(guests) || 0;
        if (currentGuests < 10) { // Maximum 10 guests
            setGuests((currentGuests + 1).toString());
        }
    };

    const decrementGuests = () => {
        const currentGuests = parseInt(guests) || 0;
        if (currentGuests > 1) { // Minimum 1 guest
            setGuests((currentGuests - 1).toString());
        }
    };

    return (
        <View style={tw`flex-1 justify-center p-4`}>
            <Text style={tw`text-lg font-bold mb-4`}>Book a Table</Text>

            <TextInput
                style={tw`border p-2 mb-4 rounded-lg`}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TouchableOpacity
                style={tw`border p-2 mb-4 rounded-lg`}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={tw`text-gray-600`}>
                    {formatDate(date) || "Select Date"}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                />
            )}

            <TouchableOpacity
                style={tw`border p-2 mb-4 rounded-lg`}
                onPress={() => setShowTimePicker(true)}
            >
                <Text style={tw`text-gray-600`}>
                    {formatTime(time) || "Select Time"}
                </Text>
            </TouchableOpacity>

            {showTimePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                    is24Hour={true}
                />
            )}

            <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 mb-2`}>Number of Guests</Text>
                <View style={tw`flex-row items-center justify-between border rounded-lg p-2`}>
                    <Pressable
                        onPress={decrementGuests}
                        style={tw`bg-gray-200 rounded-lg p-2 w-12 items-center`}
                    >
                        <Text style={tw`text-xl font-bold`}>-</Text>
                    </Pressable>

                    <Text style={tw`text-lg`}>{guests || '1'}</Text>

                    <Pressable
                        onPress={incrementGuests}
                        style={tw`bg-gray-200 rounded-lg p-2 w-12 items-center`}
                    >
                        <Text style={tw`text-xl font-bold`}>+</Text>
                    </Pressable>
                </View>
            </View>

            <Button title="Book Now" onPress={handleBooking} />
        </View>
    );
}