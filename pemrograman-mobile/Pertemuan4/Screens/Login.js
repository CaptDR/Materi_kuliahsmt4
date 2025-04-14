// Import Dependencies
import React,{ Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// Component
class Greeting extends Component {
    render(){
        return(
            <View>
                <Text style={styles.text}>Hello {this.props.name}</Text>
            </View>
        );

    }
}
const Login = () => {
    let image = {
        uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXLrTS4yaex2akpo3TGd65AfRUMNk-LGaTmw&s"
    }
    return (
      <View>
        <Text style={styles.text}>Halaman Login</Text>
        <Image source={image} style={{width:200, height:200}}/>
        <Greeting name="John" />
        <Greeting name="Jane" />
        <Greeting name="Doe" />
        <Greeting />
    </View>
    );
};
// Styling
const styles = StyleSheet.create({
    text: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: 'bold',

    },
});
// Export
export default Login;