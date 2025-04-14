// Import dependencies
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import Login from './Screens/Login';
import Signup from './Screens/Signup';

// Component
export default function App() {
  return (
    // <ScrollView onScroll={()=>alert('scrolling')}>
    <View style={styles.container}>
      <Text style={{ color: 'blue', fontSize: 35 }}>Hello React Native</Text>
      <Login />
      <Signup />
    </View>
  );
}

export default function App() {
  //Event Handler function
  const handlePress = () => {
    Alert.alert('Tombol ditekan', 'Anda menekan Tombol.');
  };
  return (
    // <ScrollView onScroll={()=>alert('scrolling')}>
    <View style={styles.container}>
      <Text style={{ color: 'blue', fontSize: 35 }}>Hello React Native</Text>
      <Button title="Click Me" onPress={handlePress}> </Button>
      <Login />
      <Signup />
    </View>
  );
}

export default function App() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native</Text>
      <TextInput
        style={{ borederBottomwidth: 1, height: 40 }}
        placeholder='Ketik Sesuatu....'
        onChangeText={(value) => setText(value)} />
      <Text> Hasil Input : {text}</Text>
      <Button title="Click Me" onPress={handlePress}> </Button>
      <Login />
      <Signup />
    </View>
  );
}

export default function App() {
  const [text, setText] = useState('');
  return (
    <ScrollView onScroll={() => alert('scrolling')}>
      <View style={styles.container}>
        <Text style={styles.text}>Hello React Native</Text>
        <TextInput
          placeholder='Tekan Enter Setelah Mengetik'
          onSubmitEditing={() => alert('Tombol ditekan')} />
        <Login />
        <Signup />
      </View>
    </ScrollView>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },

});