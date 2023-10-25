import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Pressable,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AuthTypes } from "../../commons/types/AuthTypes";
import { signUp } from "../../commons/utils/signUp";
import { renderInput } from "../Reusable/AuthInputs";

interface RegisterFormProps {
    handleAuthScreenSwitch: (type: string) => void;
}

export const RegisterForm = ({ handleAuthScreenSwitch }: RegisterFormProps) => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleSignUp = () => {
        signUp(email, password, nickname, repeatPassword);
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="position"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        handleAuthScreenSwitch(AuthTypes.WELCOME);
                    }}
                >
                    <AntDesign
                        name="left"
                        style={[styles.innerFont, { fontSize: 20 }]}
                    />
                    <Text style={[styles.innerFont, { fontSize: 20 }]}>
                        Back
                    </Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.title}>Sign up</Text>
                    <View style={styles.inputListContainer}>
                        {renderInput(
                            <AntDesign name="user" style={styles.innerFont} />,
                            "Nickname",
                            nickname,
                            setNickname
                        )}
                        {renderInput(
                            <AntDesign name="mail" style={styles.innerFont} />,
                            "E-mail",
                            email,
                            setEmail,
                            "emailAddress"
                        )}
                        {renderInput(
                            <Ionicons
                                name="ios-lock-closed-outline"
                                style={styles.innerFont}
                            />,
                            "Password",
                            password,
                            setPassword,
                            "none",
                            true
                        )}
                        {renderInput(
                            <Ionicons
                                name="ios-lock-closed-outline"
                                style={styles.innerFont}
                            />,
                            "Repeat password",
                            repeatPassword,
                            setRepeatPassword,
                            "none",
                            true
                        )}
                    </View>
                    <Pressable
                        style={styles.loginButton}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Sign up</Text>
                    </Pressable>
                    <Pressable
                        style={styles.signUpButton}
                        onPress={() => {
                            handleAuthScreenSwitch(AuthTypes.LOGIN);
                        }}
                    >
                        <Text style={styles.signUpButtonText}>
                            Already have an account?
                        </Text>
                        <Text style={styles.signUpButtonTextBold}>SIGN IN</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        top: 20,
        left: 20,
        fontSize: 26,
        color: "white",
    },
    signUpButton: {
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
    },
    title: {
        fontSize: 35,
        color: "white",
        paddingBottom: 40,
    },
    icon: {
        fontSize: 16,
        color: "white",
    },
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
        height: "100%",
    },
    innerFont: {
        fontSize: 16,
        color: "white",
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
        flexDirection: "row",
    },
    input: {
        flex: 1,
    },
    loginButton: {
        marginTop: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "rgba(140, 165, 255, 0.7)",
        borderRadius: 40,
        width: "70%",
    },
    signUpButtonText: {
        color: "white",
    },
    signUpButtonTextBold: {
        fontWeight: "600",
        color: "white",
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
        color: "white",
    },
});
