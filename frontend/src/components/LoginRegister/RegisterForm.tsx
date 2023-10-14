import {
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { AuthTypes } from "../../commons/types/AuthTypes";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserDataToPost } from "../../commons/interfaces/interfaces";
import { addDoc, collection } from "firebase/firestore";

interface WelcomeProps {
    handleButtonPress: (type: string) => void;
    setLoader: (value: boolean) => void;
}

export const RegisterForm = ({
    handleButtonPress,
    setLoader,
}: WelcomeProps) => {
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const auth = FIREBASE_AUTH;

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const userSchemaToPost: UserDataToPost = {
                uid: response.user.uid,
                email: response.user.email,
                nickname: nickname,
            };

            addDoc(collection(FIREBASE_DB, "Users"), userSchemaToPost);

            alert("Check your emails!");
        } catch (error) {
            console.log(error);
            alert("Sign up failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="position"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.backButtonIos}
                    onPress={() => {
                        handleButtonPress(AuthTypes.WELCOME);
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
                    <Text style={styles.text}>Sign up</Text>
                    <View style={styles.inputListContainer}>
                        <View style={styles.inputContainer}>
                            <AntDesign name="user" style={styles.innerFont} />
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
                            <AntDesign name="mail" style={styles.innerFont} />
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
                            <Ionicons
                                name="ios-lock-closed-outline"
                                style={styles.innerFont}
                            />
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
                            <Ionicons
                                name="ios-lock-closed-outline"
                                style={styles.innerFont}
                            />
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
                    <Pressable
                        style={styles.signUpButton}
                        onPress={() => {
                            handleButtonPress(AuthTypes.LOGIN);
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
        color: "white",
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
        height: 2,
    },
    dividerText: {
        flex: 1,
        textAlign: "center",
        color: "#adadad",
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
        backgroundColor: "rgba(140,165,255,0.7)",
        borderRadius: 40,
        width: "70%",
    },
    signUpButton: {
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        gap: 10,
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
        color: "white",
    },
});
