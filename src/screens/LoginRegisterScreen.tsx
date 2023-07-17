import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Welcome} from "../components/LoginRegister/Welcome"
import {LoginForm} from "../components/LoginRegister/LoginForm";
import {RegisterForm} from "../components/LoginRegister/RegisterForm";
import {AntDesign} from "@expo/vector-icons";

type authProps={
    handleAuth:()=>void;
}


export const LoginRegisterScreen = ({handleAuth}:authProps) => {
    const types = {
        LOGIN: "Login",
        REGISTER: "Register",
        WELCOME:"Welcome"
    };
    const [screenType,setScreenType]=useState<String>(types.WELCOME)
    const handleButtonPress=(type:String)=>{
        setScreenType(type)
    }
    const showScreenType=()=>{
        switch (screenType){
            case types.LOGIN:
                return <LoginForm handleButtonPress={handleButtonPress} handleAuth={handleAuth}/>
            case types.REGISTER:
                return <RegisterForm handleButtonPress={handleButtonPress}/>
            default:
                return <Welcome handleButtonPress={handleButtonPress}/>
        }
    }
    return (
        <ImageBackground source={require('../../assets/LoginRegisterBackground.jpg')} resizeMode={'cover'}
                         style={styles.image}>
            <View style={styles.overlay}/>
            <SafeAreaView style={styles.container}>
                {showScreenType()}
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent:"center",
        width: "100%",
        height:"100%",
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
