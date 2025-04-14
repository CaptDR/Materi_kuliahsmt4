import React from "react";
import { View, Text, StyleSheet } from "react-native";
const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Home Screen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default HomeScreen;