import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SocialIcon } from "react-native-elements";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AuthTypes } from "../../commons/types/AuthTypes";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUserDataToStorage } from "../../commons/utils/AuthContext";
import { FirebaseUserSchema } from "../../commons/interfaces/interfaces";

interface WelcomeProps {
    handleButtonPress: (type: string) => void;
    setLoader: (value: boolean) => void;
}

export const LoginForm = ({ handleButtonPress, setLoader }: WelcomeProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const userDocRef = doc(FIREBASE_DB, "Users", response.user.uid);
            const docSnapshot = await getDoc(userDocRef);

            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                if (userData) {
                    console.log("login", response.user.uid);

                    const userToStorage: FirebaseUserSchema = {
                        uid: response.user.uid,
                        email: userData?.email,
                        nickname: userData?.nickname,
                        name: userData?.name,
                        lastname: userData?.lastname,
                        avatar: userData?.avatar,
                        country: userData?.country,
                    };

                    setUserDataToStorage(userToStorage);
                    alert("Sign in successful");
                } else {
                    alert("User email not found");
                }
            } else {
                alert("User data not found in Firestore");
            }
        } catch (error) {
            console.error(error);
            alert("Sign in failed");
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
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={signIn}
                    >
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
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
    loadingContainer: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
        width: "100%",
        gap: 5,
        height: "100%",
        zIndex: 200,
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
});
