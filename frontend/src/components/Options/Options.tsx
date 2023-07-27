import {Pressable, StyleSheet, Switch, Text, View} from "react-native";
import React, {useState} from "react";
import {AntDesign, FontAwesome, Foundation, Ionicons} from '@expo/vector-icons';
import {OptionTypes} from "../../commons/types/OptionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OptionsProps {
    handleAuth: (type: boolean) => void;
    setScreenType: (value: string) => void;
}


export const Options = ({handleAuth, setScreenType}: OptionsProps) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const logout = async () => {
        try {
            await AsyncStorage.setItem('auth', JSON.stringify(false));
        } catch (err) {
            alert(err)
        }
        handleAuth(false)
    }
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Options</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.actions}>
                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionText}>Account</Text>
                    </View>
                    <View style={styles.options}>
                        <Pressable style={styles.eventButton} onPress={() => {
                            setScreenType(OptionTypes.EDIT)
                        }}>
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
                    <Pressable style={styles.eventButton} onPress={logout}>
                        <View style={styles.eventButtonFlex}>
                            <Ionicons name="log-out-outline" size={22} color="#C0C0C0FF"/>
                            <Text style={styles.eventButtonText}>Log out</Text>
                        </View>
                        <AntDesign name="right" size={18} color="white"/>
                    </Pressable>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        display: "flex",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
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
