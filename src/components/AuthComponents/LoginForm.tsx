import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {SocialIcon} from "react-native-elements";
import React, {useState} from "react";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {AuthTypes} from "../../commons/types/AuthTypes";
import {singIn} from "../../commons/utils/singIn";
import {renderInput} from "../Reusable/AuthInputs";
import {FormStyles} from "../../commons/styles/styles";

interface LoginFormProps {
    handleAuthScreenSwitch: (type: string) => void;
}

export const LoginForm = ({handleAuthScreenSwitch}: LoginFormProps) => {
    const styles = FormStyles
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
                        <View style={styles.dividerLine}/>
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine}/>
                    </View>
                    <View style={styles.inputListContainer}>
                        {renderInput(
                            <AntDesign name="mail" style={styles.innerFont}/>,
                            "E-mail",
                            email,
                            setEmail
                        )}
                        {renderInput(
                            <Ionicons
                                name="ios-lock-closed-outline"
                                style={styles.innerFont}
                            />,
                            "Password",
                            password,
                            setPassword
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => {
                            singIn(email, password);
                        }}
                    >
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={() => {
                            handleAuthScreenSwitch(AuthTypes.REGISTER);
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
