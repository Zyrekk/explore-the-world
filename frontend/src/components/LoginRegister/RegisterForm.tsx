import {KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useContext, useState} from "react";
import {AuthTypes} from "../../commons/types/AuthTypes";
import {showAlert} from "../../commons/utils/Alert";
import axios from "axios/index";
import {AuthContext, setUserDataToStorage} from "../../commons/utils/AuthContext";

type WelcomeProps = {
    handleButtonPress: (type: string) => void;
    setLoader: (value: boolean) => void;
};

export const RegisterForm = ({handleButtonPress, setLoader}: WelcomeProps) => {
    const [nickname, setNickname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const platform = Platform.OS === 'ios' ? styles.backButtonIos : styles.backButtonAndroid
    const {user, setUser} = useContext(AuthContext);
    const offset = Platform.OS === 'ios' ? -100 : -300

    const signUp = async () => {
        try {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(email)) {
                showAlert("Invalid email format", "Please try again");
                return;
            }
            if (password !== repeatPassword) {
                showAlert("Passwords don't match", "Please try again");
                return;
            }
            const userToAdd = {
                username: nickname,
                email: email,
                password: password
            }
            const response = await axios.post("http://192.168.0.30:5000/users/add", userToAdd);

            if (response.status === 409) {
                showAlert("Email or username already taken", "Please try again");
            } else if (response.status === 201) {
                showAlert("Account created successfully", "You are logged in now");
                const res = await axios.post("http://192.168.0.30:5000/users/login", {
                    email: email,
                    password: password
                });
                const userData = await res.data;
                await setUserDataToStorage(userData);
                setUser(userData);
            } else {
                showAlert("Server connection error", "Please try again later");
            }
        } catch (error) {
            // Handle network error
            showAlert("Server connection error", "Please try again later");
        }
    };
    return (
        <KeyboardAvoidingView style={styles.keyboardContainer} behavior='position' keyboardVerticalOffset={offset}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Pressable style={platform} onPress={() => {
                    handleButtonPress(AuthTypes.WELCOME)
                }}>
                    <AntDesign name="left" style={[styles.innerFont, {fontSize: 20}]}/>
                    <Text style={[styles.innerFont, {fontSize: 20}]}>Back</Text>
                </Pressable>
                <View style={styles.container}>
                    <Text style={styles.text}>Sign up</Text>
                    <View style={styles.inputListContainer}>
                        <View style={styles.inputContainer}>
                            <AntDesign name="user" style={styles.innerFont}/>
                            <TextInput
                                style={[styles.input, styles.innerFont]}
                                placeholder="Nickname"
                                value={nickname}
                                onChangeText={setNickname}
                                autoCorrect={false}
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <AntDesign name="mail" style={styles.innerFont}/>
                            <TextInput
                                style={[styles.input, styles.innerFont]}
                                placeholder="E-mail"
                                textContentType={"emailAddress"}
                                value={email}
                                onChangeText={setEmail}
                                autoCorrect={false}
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="ios-lock-closed-outline" style={styles.innerFont}/>
                            <TextInput
                                style={[styles.input, styles.innerFont]}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                autoCorrect={false}
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="ios-lock-closed-outline" style={styles.innerFont}/>
                            <TextInput
                                style={[styles.input, styles.innerFont]}
                                placeholder="Repeat password"
                                autoCorrect={false}
                                value={repeatPassword}
                                onChangeText={setRepeatPassword}
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <Pressable style={styles.loginButton} onPress={signUp}>
                        <Text style={styles.buttonText}>Sign up</Text>
                    </Pressable>
                    <Pressable style={styles.signUpButton} onPress={() => {
                        handleButtonPress(AuthTypes.LOGIN)
                    }}>
                        <Text style={styles.signUpButtonText}>Already have an account?</Text>
                        <Text style={styles.signUpButtonTextBold}>SIGN IN</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    keyboardContainer: {
        display: "flex",
        justifyContent: "flex-end",
        height: "100%",
        paddingBottom: 40,
    },
    container: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    scrollContainer: {
        flexGrow: 1,
        height: "100%"
    },
    loginOptions: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        width: "70%",
    },
    button: {
        width: "100%",
        padding: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "white"
    },
    text: {
        fontSize: 35,
        color: "white",
        paddingBottom: 40,
    },
    divider: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
        width: "70%",
    },
    dividerLine: {
        flex: 3,
        backgroundColor: "#adadad",
        height: 2
    },
    dividerText: {
        flex: 1,
        textAlign: "center",
        color: "#adadad",
    },
    innerFont: {
        fontSize: 16,
        color: "white"
    },
    inputListContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        display: "flex",
        padding: 15,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 40,
        width: "70%",
        borderWidth: 2,
        borderColor: "white",
        marginTop: 25,
        height: 50,
        gap: 10,
        flexDirection: "row"
    },
    input: {
        flex: 1
    },
    loginButton: {
        marginTop: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "rgba(140,165,255,0.7)",
        borderRadius: 40,
        width: "70%",
    },
    signUpButton: {
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    signUpButtonText: {
        color: "white"
    },
    signUpButtonTextBold: {
        fontWeight: "600",
        color: "white"
    },
    backButtonIos: {
        position: "absolute",
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        top: 20,
        left: 20,
        fontSize: 26,
        color: "white"
    },
    backButtonAndroid: {
        position: "absolute",
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        top: 50,
        left: 20,
        fontSize: 26,
        color: "white"
    }

});
