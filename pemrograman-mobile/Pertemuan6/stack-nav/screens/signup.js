import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Halaman Sign Up</Text>
      <Button title="Login" onPress={() => navigation.navigate("SignIn")} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
export default SignUp;