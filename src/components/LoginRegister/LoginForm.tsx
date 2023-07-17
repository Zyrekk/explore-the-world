import {View, Text, StyleSheet, Pressable, TextInput,KeyboardAvoidingView} from "react-native";
import {SocialIcon} from 'react-native-elements'
import React from "react";
import {AntDesign, Ionicons} from '@expo/vector-icons';

type WelcomeProps = {
    handleButtonPress: (type: string) => void;
    handleAuth: () => void;
};

export const LoginForm = ({ handleButtonPress,handleAuth }: WelcomeProps) => {
    const types = {
        LOGIN: "Login",
        REGISTER: "Register",
        WELCOME:"Welcome"
    };
    return (
        <KeyboardAvoidingView style={styles.keyboardContainer} behavior='position' keyboardVerticalOffset={-100}>
            <Pressable style={styles.backButton} onPress={()=>{
                handleButtonPress(types.WELCOME)
            }}>
                <AntDesign name="left" style={[styles.innerFont,{fontSize: 20}]} />
                <Text style={[styles.innerFont,{fontSize: 20}]}>Back</Text>
            </Pressable>
                <View style={styles.container}>
                    <Text style={styles.text}>Login</Text>
                    <View style={styles.loginOptions}>
                        <SocialIcon
                            raised={false}
                            type='facebook'
                            title='Sign In With Facebook'
                            button
                            style={styles.button}
                        />
                        <SocialIcon
                            raised={false}
                            type='google'
                            title='Sign In With Google'
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
                        <View style={styles.inputContainer}>
                            <AntDesign name="user" style={styles.innerFont}/>
                            <TextInput
                                style={[styles.input,styles.innerFont]}
                                placeholder="Login"
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="ios-lock-closed-outline" style={styles.innerFont} />
                            <TextInput
                                style={[styles.input,styles.innerFont]}
                                placeholder="Password"
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <Pressable style={styles.loginButton}onPress={()=>{
                        handleAuth()
                    }} >
                        <Text style={styles.buttonText}>Log in</Text>
                    </Pressable>
                    <Pressable style={styles.signUpButton} onPress={()=>{
                        handleButtonPress(types.REGISTER)
                    }}>
                        <Text style={styles.signUpButtonText}>Don't have an account?</Text>
                        <Text style={styles.signUpButtonTextBold}>SIGN UP</Text>
                    </Pressable>
                </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    keyboardContainer:{
        display:"flex",
        justifyContent:"flex-end",
        height: "100%",
        paddingBottom:40,
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
        fontSize:16,
        fontWeight:"600",
        color: "white"
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
        height: 2
    },
    dividerText: {
        flex: 1,
        textAlign: "center",
        color: "#adadad",
    },
    innerFont: {
        fontSize: 16,
        color: "white"
    },
    inputListContainer:{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    inputContainer:{
        display: "flex",
        padding:15,
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius:40,
        width:"70%",
        borderWidth:2,
        borderColor:"white",
        marginTop:25,
        height:50,
        gap: 10,
        flexDirection: "row"
    },
    input: {
        flex:1
    },
    loginButton:{
        marginTop:25,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:50,
        backgroundColor:"rgba(45,80,169,0.7)",
        borderRadius:40,
        width: "70%",
    },
    signUpButton:{
        marginTop:25,
        display:"flex",
        flexDirection:"row",
        gap:10
    },
    signUpButtonText:{
        color:"white"
    },
    signUpButtonTextBold:{
        fontWeight:"600",
        color:"white"
    },
    backButton:{
        position:"absolute",
        zIndex:100,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        top:20,
        left:20,
        fontSize: 26,
        color: "white"
    }

});
