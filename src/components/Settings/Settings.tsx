import {Text, SafeAreaView, StyleSheet, Pressable, Platform, View} from "react-native";
import React from "react";
import {AntDesign, MaterialIcons, Ionicons} from '@expo/vector-icons';

interface SettingsProps {
    handleLogout: () => void;
}


export const Settings = ({handleLogout}: SettingsProps) => {
    const platform = Platform.OS === 'ios' ? styles.settingsIos : styles.settingsAndroid
    return (
        <SafeAreaView style={platform}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.actions}>
                <Pressable style={styles.eventButton}>
                    <View style={styles.eventButtonFlex}>
                        <Ionicons name="ios-settings-outline" size={22} color="black"/>
                        <Text style={styles.eventButtonText}>Settings</Text>
                    </View>
                    <AntDesign name="right" size={18} color="black"/>
                </Pressable>
                <Pressable style={styles.eventButton}>
                    <View style={styles.eventButtonFlex}>
                        <Ionicons name="notifications-outline" size={22} color="black"/>
                        <Text style={styles.eventButtonText}>Notifications</Text>
                    </View>
                    <AntDesign name="right" size={18} color="black"/>
                </Pressable>
                <Pressable style={styles.eventButton}>
                    <View style={styles.eventButtonFlex}>
                        <Ionicons name="eye-outline" size={22} color="black"/>
                        <Text style={styles.eventButtonText}>Apperance</Text>
                    </View>
                    <AntDesign name="right" size={18} color="black"/>
                </Pressable>
                <Pressable style={styles.eventButton}>
                    <View style={styles.eventButtonFlex}>
                        <MaterialIcons name="support-agent" size={22} color="black"/>
                        <Text style={styles.eventButtonText}>Help & Support</Text>
                    </View>
                    <AntDesign name="right" size={18} color="black"/>
                </Pressable>
                <Pressable style={styles.eventButton}>
                    <View style={styles.eventButtonFlex}>
                        <Ionicons name="ios-help-circle-outline" size={22} color="black"/>
                        <Text style={styles.eventButtonText}>About</Text>
                    </View>
                    <AntDesign name="right" size={18} color="black"/>
                </Pressable>
                <Pressable onPress={handleLogout} style={styles.eventLogout}>
                    <Text style={styles.font}>
                        Logout
                    </Text>
                    <MaterialIcons name="logout" size={18} color="white"/>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    settingsIos: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 60,
        // backgroundColor:"#383838",
        // backgroundColor:"black",
        backgroundColor: "#292a2d",
        width: "100%",
        height: "100%",
    },
    settingsAndroid: {
        display: "flex",
        alignItems: "center",
        gap: 60,
        // backgroundColor:"#383838",
        // backgroundColor:"black",
        backgroundColor: "#292a2d",
        width: "100%",
        paddingTop: 50,
        minHeight: "100%"
    },
    title: {
        paddingTop: 50,
        color: "white",
        fontSize: 28
    },
    actions: {
        display: "flex",
        justifyContent: "center",
        gap: 20,
        alignItems: "center",
        width: "100%",
        marginBottom: 140
    },
    eventLogout: {
        backgroundColor: "#ef4444",
        borderRadius: 10,
        width: "90%",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        gap: 4,
        justifyContent: "space-between",
        alignItems: "center"
    },
    eventButton: {
        padding: 10,
        borderRadius: 10,
        width: "90%",
        backgroundColor: "#F6F8E2",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    eventButtonFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    eventButtonText: {
        color: "black",
        fontSize: 18
    },
    font: {
        fontSize: 18,
        color: "white"
    }
})
