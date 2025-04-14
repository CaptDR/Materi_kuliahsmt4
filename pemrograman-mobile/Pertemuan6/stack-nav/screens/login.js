import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
const SignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10, fontSize: 24, fontWeight: "bold" }}>
        Halaman Sign In
      </Text>
      <TextInput placeholder="Email" style={{ marginBottom: 10 }} />
      <TextInput placeholder="Password" style={{ marginBottom: 10 }} />
      <Button title="Login" style={{ marginBottom: 10 }} />
      <Text style={{ marginBottom: 10 }}>Don't have an account?</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
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
export default SignIn;