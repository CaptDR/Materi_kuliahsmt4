import React from "react";
import { View, Text, StyleSheet } from "react-native";
const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Profile Screen</Text>
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
export default ProfileScreen;
