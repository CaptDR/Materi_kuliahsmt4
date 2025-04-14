import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { styles } from "./styles";
const Signup = () => {
    const [count, setCount] = useState(9);
    console.log(count);

    const [books, setBooks] = useState({
        title: "React Native",
        author:"Agus Jhon"
});
    const kurang = () => {
        setCount(prevCount => prevCount - 1);
        setCount(prevCount => prevCount - 1);
    }
    const Tambah = () => {
        setCount(t=> t + 1);
        setCount(t=> t + 1);
    }
    const changes = () =>{
        setBooks(t => ({...t, author:"Buddy"}))  
    }
    return (
        <View>
            <Text style={styles.text}>Halaman Signup</Text>
            <Button title="Kurang" onPress={kurang} /> 
            <Text>Count: {count} </Text>
            <Button title="Tambah" onPress={Tambah} /> 
            <Text>Judul Buku: {books.title}</Text>
            <Text>Penulis: {books.author}</Text>
            <Button title="Changes Book" onPress={changes} />

        </View>
    );
};
export default Signup;