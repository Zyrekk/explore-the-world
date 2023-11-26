import {View, Text, SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'
import {Link} from "expo-router";
import SettingsButton from "@/components/Settings/SettingsButton";
import {AntDesign, Feather, Foundation, Ionicons} from "@expo/vector-icons";

const MainSettings = () => {
    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-[#150227]">
            <Text style={styles.title}>Options</Text>
            <View style={styles.sections}>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Account</Text>
                    <SettingsButton name={"Edit profile"} icon={<AntDesign
                        name="user"
                        size={22}
                        color="white"
                    />} link={"/settings/edit"}/>
                    <SettingsButton name={"Change password"} icon={<Foundation
                        name="key"
                        size={22}
                        color="white"
                    />} link={"/settings/password"}/>
                    <SettingsButton name={"Delete account"} icon={<Feather name="trash-2" size={22} color="white"/>}
                                    link={"/settings/delete"}/>
                </View>
            </View>
            <View style={styles.sections}>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Log out</Text>
                    <SettingsButton name={"Log out"} icon={<Ionicons
                        name="log-out-outline"
                        size={22}
                        color="white"
                    />} link={"/settings/logout"}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centerContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        paddingTop: 50,
        paddingHorizontal: 20,
        alignSelf: "flex-start",
        color: "#fff",
        fontSize: 32,
    },
    sections: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    section: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingTop: 30,
    },
    subtitle: {
        paddingLeft: 20,
        fontSize: 16,
        color: "#fff"
    },
});

export default MainSettings;
