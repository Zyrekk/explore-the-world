import {Link, useRouter} from "expo-router";
import React, {useState} from "react";
import {
    View,
    StyleSheet,
    TextInput,
    Pressable, SafeAreaView, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, TouchableOpacity
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {signIn} from "@/utils/signIn";
import { Text } from "@ui-kitten/components";
import {AuthInput} from "@/components/AuthInput";
import {PasswordInput} from "@/components/PasswordInput";
import LoginVia from "@/components/LoginVia";
import {AntDesign} from "@expo/vector-icons";

const Login = () => {
    const router = useRouter()
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [securePassword, setSecurePassword] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <View style={{flex: 1, backgroundColor: "#000000EA"}}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.keyboardContainer}
                    behavior="position"
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => {
                                router.back()
                            }}
                        >
                            <AntDesign
                                name="left"
                                color={"#FFFFFF"}
                                style={{fontSize: 20}}
                            />
                            <Text style={styles.backText}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.headContainer}>
                            <Text style={styles.title}>Login</Text>
                            <Text style={styles.subtitle}>Please sign in to continue</Text>
                        </View>
                        <View style={styles.formContainer}>
                            <LoginVia/>
                            <View style={styles.divider}>
                                <View style={styles.dividerLine}/>
                                <Text style={styles.dividerText}>OR</Text>
                                <View style={styles.dividerLine}/>
                            </View>
                            <AuthInput
                                onChangeText={setEmailAddress}
                                value={emailAddress}
                                secureTextEntry={false}
                                label={"Email Address"}
                                placeholder={"Enter Email Address"}
                                textContentType={"none"}
                            />
                            <PasswordInput placeholder={"Enter Password"} value={password} onChangeText={setPassword}
                                           label={"Password"}/>
                            <Pressable style={styles.signInButton}>
                                <Text style={styles.signInText}>
                                    SIGN IN
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>

        // <View>
        //     <Layout
        //         style={styles.container}
        //         level='1'
        //     >
        //
        //         <Button appearance='outline' onPress={() => setCounter(counter + 1)}>
        //             BUTTON
        //         </Button>
        //
        //         <Text style={styles.text}>
        //             {`Pressed ${counter} times`}
        //         </Text>
        //
        //     </Layout>
        // </View>
        // <View style={styles.container}>
        //   <Spinner visible={loading} />
        //
        //   <TextInput
        //     autoCapitalize="none"
        //     placeholder="simon@galaxies.dev"
        //     value={emailAddress}
        //     onChangeText={setEmailAddress}
        //     style={styles.inputField}
        //   />
        //   <TextInput
        //     placeholder="password"
        //     value={password}
        //     onChangeText={setPassword}
        //     secureTextEntry
        //     style={styles.inputField}
        //   />
        //
        //   <Button onPress={()=>{
        //     signIn(emailAddress,password,setLoading,router)
        //   }} title="Login" color={"#6c47ff"}></Button>
        //
        //   <Link href="/reset" asChild>
        //     <Pressable style={styles.button}>
        //       <Text>Forgot password?</Text>
        //     </Pressable>
        //   </Link>
        //   <Link href="/register" asChild>
        //     <Pressable style={styles.button}>
        //       <Text>Create Account</Text>
        //     </Pressable>
        //   </Link>
        // </View>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    safeArea: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    headContainer: {
        display: "flex",
        gap: 8,
        width: "100%",
    },
    title: {
        fontSize: 36,
        fontFamily: "Montserrat_700Bold",
        fontWeight: "500"
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "Montserrat_600SemiBold",
        fontWeight: "400",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: 40,
        gap: 20,
    },
    divider: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
    },
    dividerLine: {
        flex: 3,
        backgroundColor: "#ffffff",
        height: 2,
    },
    dividerText: {
        flex: 1,
        textAlign: "center",
        color: "#ffffff",
    },
    signInButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 40,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 20,
        width: "100%"
    },
    signInText: {
        color: "black",
        fontWeight: "500",
        fontFamily: "Montserrat_600SemiBold",
        fontSize: 20,
    },
    scrollContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        height:"100%"
    },
    backButton: {
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems:"center",
        gap: 10,
        fontSize: 26,
        color: "white",
        marginBottom:30,
    },
    backText:{
        fontFamily: "Montserrat_600SemiBold",
        fontSize: 21,
        color:"white",
    }

})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   inputField: {
//     marginVertical: 4,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#6c47ff",
//     borderRadius: 4,
//     padding: 10,
//     backgroundColor: "#fff",
//   },
//   button: {
//     margin: 8,
//     alignItems: "center",
//   },
// });

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     text: {
//         marginHorizontal: 8,
//         color:"white"
//     },
// });

export default Login;
