import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import React from "react";


export const showLoader = (type: boolean, text: string) => {
    if (type) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.innerFont}>{text}</Text>
                <ActivityIndicator size="large" color="#fff"/>
            </View>)
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
        width: "100%",
        gap: 5,
        height: "100%",
        zIndex: 200
    },
    innerFont: {
        fontSize: 16,
        color: "white"
    },
})
