import {View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import {resetPassword} from "@/utils/resetPassword";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {publicStyles} from "@/styles/publicStyles";
import Spinner from "react-native-loading-spinner-overlay";
import {useRouter} from "expo-router";
import {UserInterface} from "@/constants/UserInterface";

const Password = () => {
    const router=useRouter()
    const [user,setUser]=useState<UserInterface|null>(null)
    useEffect(() => {
        getUserFromStorage().then((user) => setUser(user));
    }, []);

    return(
        <View style={{ flex: 1 }}>
            <SafeAreaView style={publicStyles.safeArea}>
                    <View
                        style={publicStyles.keyboardContainer}
                    >
                        <ScrollView contentContainerStyle={publicStyles.scrollContainer}>
                            <View style={publicStyles.headContainer}>
                                <Text style={[publicStyles.title,{marginTop:50,color:"black"}]}>Password reset</Text>
                            </View>
                            <View style={publicStyles.formContainer}>
                                <Pressable
                                    onPress={() => {
                                        if(user) {
                                            resetPassword(user.email,router,true)
                                        }
                                    }}
                                    style={[publicStyles.signInButton,{backgroundColor: "black"}]}
                                >
                                    <Text style={[publicStyles.signInText,{color:"white"}]}>SEND RESET EMAIL</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    centerContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        paddingTop: 50,
        paddingHorizontal: 20,
        alignSelf: "flex-start",
        color: "#000000",
        fontSize: 32,
    },
    sections: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    section: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingTop: 30,
    },
    subtitle: {
        paddingLeft: 20,
        fontSize: 16,
        color: "#000000",
    },
});

export default Password;
