import {Link, useRouter} from "expo-router";
import React, {useState} from "react";
import {
    View,
    Pressable,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {signIn} from "@/utils/signIn";
import {Text} from "@ui-kitten/components";
import {AuthInput} from "@/components/Auth/AuthInput";
import {PasswordInput} from "@/components/Auth/PasswordInput";
import {AntDesign} from "@expo/vector-icons";
import {publicStyles} from "@/styles/publicStyles";
import {signUp} from "@/utils/signUp";

const Register = () => {
    const router = useRouter();
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    return (

        <View style={{flex: 1, backgroundColor: "black"}}>
            <SafeAreaView style={publicStyles.safeArea}>
                {loading ? (
                    <Spinner visible={loading} textContent={""}/>
                ) : (
                    <View style={publicStyles.scrollContainer}>
                        <KeyboardAvoidingView
                            style={{width: "100%", display: "flex"}}
                            behavior="position"
                            keyboardVerticalOffset={60}
                        >
                            <TouchableOpacity
                                style={publicStyles.backButton}
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <AntDesign
                                    name="left"
                                    color={"#FFFFFF"}
                                    style={{fontSize: 20}}
                                />
                                <Text style={publicStyles.backText}>Back</Text>
                            </TouchableOpacity>
                            <View style={publicStyles.headContainer}>
                                <Text style={publicStyles.title}>Register</Text>
                                <Text style={publicStyles.subtitle}>Create account to continue</Text>
                            </View>

                            {/*<LoginVia />*/}
                            {/*<View style={publicStyles.divider}>*/}
                            {/*  <View style={publicStyles.dividerLine} />*/}
                            {/*  <Text style={publicStyles.dividerText}>OR</Text>*/}
                            {/*  <View style={publicStyles.dividerLine} />*/}
                            {/*</View>*/}
                            <View style={publicStyles.formContainer}>
                                <AuthInput
                                    onChangeText={setEmailAddress}
                                    value={emailAddress}
                                    secureTextEntry={false}
                                    label={"Email Address*"}
                                    placeholder={"Enter Email Address"}
                                    textContentType={"none"}
                                />
                                <AuthInput
                                    onChangeText={setNickname}
                                    value={nickname}
                                    secureTextEntry={false}
                                    label={"Nickname*"}
                                    placeholder={"Enter Nickname"}
                                    textContentType={"none"}
                                />
                                <PasswordInput
                                    placeholder={"Enter Password"}
                                    value={password}
                                    onChangeText={setPassword}
                                    label={"Password*"}
                                />
                                <PasswordInput
                                    placeholder={"Confirm Password"}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    label={"Confirm Password*"}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <Pressable
                            onPress={() => {
                                signUp(emailAddress, password, confirmPassword, nickname, setLoading, router);
                            }}
                            style={publicStyles.signInButton}
                        >
                            <Text style={publicStyles.signInText}>SIGN UP</Text>
                        </Pressable>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

export default Register;
