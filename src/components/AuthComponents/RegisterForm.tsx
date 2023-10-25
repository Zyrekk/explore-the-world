import React, {useState} from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Pressable,
} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {AuthTypes} from "../../commons/types/AuthTypes";
import {signUp} from "../../commons/utils/signUp";
import {renderInput} from "../Reusable/AuthInputs";
import {FormStyles} from "../../commons/styles/styles";

interface RegisterFormProps {
    handleAuthScreenSwitch: (type: string) => void;
}

export const RegisterForm = ({handleAuthScreenSwitch}: RegisterFormProps) => {
    const styles = FormStyles
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

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
                        style={[styles.innerFont, {fontSize: 20}]}
                    />
                    <Text style={[styles.innerFont, {fontSize: 20}]}>
                        Back
                    </Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.title}>Sign up</Text>
                    <View style={styles.inputListContainer}>
                        {renderInput(
                            <AntDesign name="user" style={styles.innerFont}/>,
                            "Nickname",
                            nickname,
                            setNickname
                        )}
                        {renderInput(
                            <AntDesign name="mail" style={styles.innerFont}/>,
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
                        onPress={()=>{
                            signUp(email, password, nickname, repeatPassword);
                        }}
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
