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
import LoginVia from "@/components/Auth/LoginVia";
import {AntDesign} from "@expo/vector-icons";
import {publicStyles} from "@/styles/publicStyles";

const Login = () => {
    const router = useRouter();
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <View style={{flex: 1, backgroundColor: "black"}}>
            <SafeAreaView style={publicStyles.safeArea}>
                {loading ? (
                    <Spinner visible={loading} textContent={""}/>
                ) : (
                    <View style={publicStyles.scrollContainer}>
                      <KeyboardAvoidingView
                          style={{width:"100%",display:"flex"}}
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
                            <Text style={publicStyles.title}>Login</Text>
                            <Text style={publicStyles.subtitle}>Please sign in to continue</Text>
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
                                label={"Email Address"}
                                placeholder={"Enter Email Address"}
                                textContentType={"none"}
                            />
                            <PasswordInput
                                placeholder={"Enter Password"}
                                value={password}
                                onChangeText={setPassword}
                                label={"Password"}
                            />
                            <Link href={"/reset"} style={publicStyles.forgotPasswordLink}>
                                Forgot Password?
                            </Link>
                            <Pressable
                                onPress={() => {
                                    signIn(emailAddress, password, setLoading, router);
                                }}
                                style={publicStyles.signInButton}
                            >
                                <Text style={publicStyles.signInText}>SIGN IN</Text>
                            </Pressable>
                        </View>
                        </KeyboardAvoidingView>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

export default Login;
