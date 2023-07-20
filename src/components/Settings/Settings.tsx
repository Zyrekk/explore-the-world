import {Text, SafeAreaView, StyleSheet, Pressable} from "react-native";
import React from "react";

interface SettingsProps {
    handleLogout: () => void;
}


export const Settings =({handleLogout}:SettingsProps)=>{
    return(
        <SafeAreaView style={styles.container}>
                <Pressable onPress={handleLogout}><Text>Logout</Text></Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent:"center",
        width: "100%",
        height:"100%",
    },
})
