import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, Pressable} from 'react-native'
import React, {useState} from 'react'
import {publicStyles} from "@/styles/publicStyles";
import Spinner from "react-native-loading-spinner-overlay";
import {AntDesign} from "@expo/vector-icons";
import {AuthInput} from "@/components/Auth/AuthInput";
import {useRouter} from "expo-router";
import {resetPassword} from "@/utils/resetPassword";

const Reset = () => {
    const router=useRouter()
    const [emailAddress, setEmailAddress] = useState<string>("");
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <SafeAreaView style={publicStyles.safeArea}>
                    <View
                        style={publicStyles.keyboardContainer}
                    >
                        <ScrollView contentContainerStyle={publicStyles.scrollContainer}>
                            <TouchableOpacity
                                style={publicStyles.backButton}
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <AntDesign
                                    name="left"
                                    color={"#FFFFFF"}
                                    style={{ fontSize: 20 }}
                                />
                                <Text style={publicStyles.backText}>Back</Text>
                            </TouchableOpacity>
                            <View style={publicStyles.headContainer}>
                                <Text style={publicStyles.title}>Password reset</Text>
                            </View>
                            <View style={publicStyles.formContainer}>
                                <AuthInput
                                    onChangeText={setEmailAddress}
                                    value={emailAddress}
                                    secureTextEntry={false}
                                    label={"Email Address"}
                                    placeholder={"Enter Email Address"}
                                    textContentType={"none"}
                                />
                                <Pressable
                                    onPress={() => {
                                        resetPassword(emailAddress,router)
                                    }}
                                    style={publicStyles.signInButton}
                                >
                                    <Text style={publicStyles.signInText}>SEND RESET EMAIL</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
            </SafeAreaView>
        </View>
    );
}

export default Reset;
