import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import tw from 'twrnc';

const UserForm = () => {
    const [form, setForm] = useState({
        title: '',
        content: ''
    });

    const db = useSQLiteContext();
    const handleSubmit = async () => {
        try {
            if (!form.title || !form.content) {
                throw new Error('All fields are required');
            }

            await db.runAsync(
                'INSERT INTO note (title, content) VALUES (?, ?)',
                [form.title, form.content]
            );
            Alert.alert('Success', 'Note added successfully!');
            setForm({
                title: '',
                content: ''
            });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.message || 'An error occurred while adding the user.');
        }
    };
    return (
        <View style={tw`m-5 android:pt-2 bg-white dark:bg-black rounded-lg shadow-md p-4 mx-4`}>
            <Text style={tw`text-xl text-center font-bold text-gray-800 dark:text-white mb-4`}>
                ADD NOTE
            </Text>

            <TextInput
                style={tw`border border-gray-300 rounded-md p-3 mb-4 bg-gray-100 `}
                placeholder="Title"
                placeholderTextColor={tw.color('gray-500')}
                value={form.title}
                onChangeText={(text) => setForm({ ...form, title: text })}
            />

            <TextInput
                style={tw`border border-gray-300 rounded-md p-3 mb-4 bg-gray-100 h-32`}
                placeholder="Content"
                placeholderTextColor={tw.color('gray-500')}
                value={form.content}
                multiline
                numberOfLines={4}
                onChangeText={(text) => setForm({ ...form, content: text })}
            />

            <TouchableOpacity
                style={tw`m-5 bg-blue-500 py-3 px-6 rounded-xl shadow-md`}
                onPress={handleSubmit}
            >
                <Text style={tw`text-white text-center font-semibold text-base`}>
                    Add Note
                </Text>
            </TouchableOpacity>
        </View>
    );
};
export default UserForm;