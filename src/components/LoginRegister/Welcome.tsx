import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";

type WelcomeProps = {
    handleButtonPress: (type: string) => void;
};

export const Welcome = ({ handleButtonPress }: WelcomeProps) => {
    const types = {
        LOGIN: "Login",
        REGISTER: "Register",
        WELCOME:"Welcome"
    };
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Explore</Text>
                <Text style={styles.text}>The</Text>
                <Text style={styles.text}>World</Text>
            </View>
            <View style={styles.select}>
                <Pressable style={[styles.button,styles.buttonMain]} onPress={()=>{
                    handleButtonPress(types.LOGIN)
                }}>
                    <Text style={styles.buttonText}>Log in</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={()=>{
                    handleButtonPress(types.REGISTER)
                }} >
                    <Text style={styles.buttonText}>Sign up</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent:"space-between",
        width: "100%",
        height:"100%",
    },
    select:{
        display:"flex",
        width:"100%",
        alignItems: "center",
        gap: 25,
        paddingBottom:50,
    },
    textContainer: {
        paddingLeft: 40,
        paddingTop: 40,
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    text: {
        fontSize: 60,
        color: "white"
    },
    button:{
        borderRadius:30,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"80%",
        height:50,
        borderWidth:2,
        borderColor:"white"
    },
    buttonMain:{
        borderColor:"transparent",
        backgroundColor:"rgba(45,80,169,0.7)",
    },
    buttonText:{
        color:"white",
        fontSize:18

    }
});

