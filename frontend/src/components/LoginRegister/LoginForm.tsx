import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SocialIcon } from "react-native-elements";
import React, { useContext, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AuthTypes } from "../../commons/types/AuthTypes";
import {
    AuthContext,
    getUserDataFromStorage,
    setUserDataToStorage,
} from "../../commons/utils/AuthContext";
import axios from "axios";

type WelcomeProps = {
    handleButtonPress: (type: string) => void;
};

export const LoginForm = ({ handleButtonPress }: WelcomeProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const platform =
        Platform.OS === "ios" ? styles.backButtonIos : styles.backButtonAndroid;
    const offset = Platform.OS === "ios" ? -100 : -300;
    const { user, setUser } = useContext(AuthContext);
    const [tempUser, setTempUser] = useState<any>(null);

    // const logIn = async () => {
    //     const body = fetch(`http://192.168.0.30:5000/users/getByEmail/${email}`)
    //         .then((response) => response.json())
    //         .then((userData) => {
    //             setTempUser(userData);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    //         setUserDataToStorage(usertest);
    //         setUser(usertest);
    // };

    const signIn = async () => {
        const body = await fetch(
            `http://192.168.0.30:5000/users/getByEmail/${email}`
        )
            .then((response) => response.json())
            .then((userData) => {
                setUserDataToStorage(userData);
                setUser(userData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        // console.log(body);
        // const usertest = {
        //     id: "1",
        //     username: "kapibara",
        //     email: "kapibara@wp.pl",
        //     password: "kapibara",
        //     avatar: "sss",
        // };

        // setUserDataToStorage(usertest);
        // setUser(usertest);
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="position"
            keyboardVerticalOffset={offset}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Pressable
                    style={platform}
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
                </Pressable>
                <View style={styles.container}>
                    <Text style={styles.text}>Sign in</Text>
                    <View style={styles.loginOptions}>
                        <SocialIcon
                            raised={false}
                            type="facebook"
                            title="Sign In With Facebook"
                            button
                            style={styles.button}
                        />
                        <SocialIcon
                            raised={false}
                            type="google"
                            title="Sign In With Google"
                            button
                            style={styles.button}
                        />
                    </View>
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>
                    <View style={styles.inputListContainer}>
                        <View style={styles.inputContainer}>
                            <AntDesign name="mail" style={styles.innerFont} />
                            <TextInput
                                style={[styles.input, styles.innerFont]}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="E-mail"
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
                                onChangeText={setPassword}
                                value={password}
                                placeholderTextColor="#fff"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <Pressable style={styles.loginButton} onPress={signIn}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </Pressable>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={() => {
                            handleButtonPress(AuthTypes.REGISTER);
                        }}
                    >
                        <Text style={styles.signUpButtonText}>
                            Don't have an account?
                        </Text>
                        <Text style={styles.signUpButtonTextBold}>SIGN UP</Text>
                    </TouchableOpacity>
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
    scrollContainer: {
        flexGrow: 1,
        height: "100%",
    },
    container: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
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
        height: 40,
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
