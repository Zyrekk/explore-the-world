import {Text, SafeAreaView, StyleSheet, Pressable, Platform, View, ScrollView, Switch} from "react-native";
import React, {useState} from "react";
import {AntDesign, Foundation, Ionicons, FontAwesome} from '@expo/vector-icons';

interface OptionsProps {
    handleLogout: () => void;
}


export const Options = ({handleLogout}: OptionsProps) => {
    const platform = Platform.OS === 'ios' ? styles.settingsIos : styles.settingsAndroid
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <SafeAreaView style={platform}>
            <ScrollView style={styles.scroll} contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Options</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.actions}>
                        <View style={styles.actionTextContainer}>
                            <Text style={styles.actionText}>Account</Text>
                        </View>
                        <View style={styles.options}>
                            <Pressable style={styles.eventButton}>
                                <View style={styles.eventButtonFlex}>
                                    <AntDesign name="user" size={22} color="#C0C0C0FF"/>
                                    <Text style={styles.eventButtonText}>Edit profile</Text>
                                </View>
                                <AntDesign name="right" size={18} color="white"/>
                            </Pressable>
                            <Pressable style={styles.eventButton}>
                                <View style={styles.eventButtonFlex}>
                                    <Foundation name="key" size={22} color="#C0C0C0FF"/>
                                    <Text style={styles.eventButtonText}>Change password</Text>
                                </View>
                                <AntDesign name="right" size={18} color="white"/>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <View style={styles.actionTextContainer}>
                            <Text style={styles.actionText}>Settings</Text>
                        </View>
                        <View style={styles.options}>
                            <Pressable style={styles.eventButton}>
                                <View style={styles.eventButtonFlex}>
                                    <FontAwesome name="paper-plane-o" size={18} color="#C0C0C0FF"
                                                 style={{paddingRight: 2}}/>
                                    <Text style={styles.eventButtonText}>Notices</Text>
                                </View>
                                <AntDesign name="right" size={18} color="white"/>
                            </Pressable>
                            <Pressable style={styles.eventButton}>
                                <View style={styles.eventButtonFlex}>
                                    <Ionicons name="language" size={22} color="#C0C0C0FF"/>
                                    <Text style={styles.eventButtonText}>Language</Text>
                                </View>
                                <AntDesign name="right" size={18} color="white"/>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <View style={styles.actionTextContainer}>
                            <Text style={styles.actionText}>Location</Text>
                        </View>
                        <View style={styles.options}>
                            <View style={styles.eventButton}>
                                <View style={styles.eventButtonFlex}>
                                    <Ionicons name="location-outline" size={22} color="#C0C0C0FF"/>
                                    <Text style={styles.eventButtonText}>Location tracking</Text>
                                </View>
                                <Switch
                                    trackColor={{false: '#767577', true: "#8ca5ff"}}
                                    thumbColor="white"
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                    style={{transform: [{scale: 0.9}]}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <View style={styles.actionTextContainer}>
                            <Text style={styles.actionText}>Log out</Text>
                        </View>
                        <Pressable style={styles.eventButton} onPress={()=>{
                            handleLogout()
                        }}>
                            <View style={styles.eventButtonFlex}>
                                <Ionicons name="log-out-outline" size={22} color="#C0C0C0FF"/>
                                <Text style={styles.eventButtonText}>Log out</Text>
                            </View>
                            <AntDesign name="right" size={18} color="white"/>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        backgroundColor: "#030712"
    },
    titleContainer: {
        display: "flex",
        justifyContent: "flex-start",
        paddingHorizontal:20,
        paddingTop: 30,
        paddingBottom: 30,
    },
    section: {
        display: "flex",
        flexDirection: "column",
        gap: 30,
        paddingTop: 30,
    },
    options: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 25,
    },
    actions: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        width: "100%",
    },
    actionTextContainer: {
        width: "100%"
    },
    actionText: {
        paddingLeft: 20,
        fontSize: 16,
        color: "#8ca5ff"
    },
    settingsIos: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 60,
        backgroundColor: "#030712",
        width: "100%",
        height: "100%",
    },
    settingsAndroid: {
        display: "flex",
        alignItems: "center",
        gap: 60,

        backgroundColor: "#292a2d",
        width: "100%",
        paddingTop: 50,
        minHeight: "100%"
    },
    title: {
        paddingTop: 20,
        color: "#8ca5ff",
        fontSize: 32
    },
    eventButton: {
        width: "100%",
        paddingHorizontal: 20,
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
        gap: 10
    },
    eventButtonText: {
        color: "white",
        fontSize: 18
    },
})
