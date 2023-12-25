import {View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, TextInput} from 'react-native'
import React, {useEffect, useState} from 'react'
import {deleteUserFromFirebase} from "@/utils/deleteUserFromFirebase";
import {publicStyles} from "@/styles/publicStyles";
import {useRouter} from "expo-router";
import {deleteUserFromStorage} from "@/utils/deleteUserFromStorage";
import {PasswordInput} from "@/components/Auth/PasswordInput";
import {signIn} from "@/utils/signIn";
import {deleteConfirm} from "@/utils/deleteConfirm";
import {UserInterface} from "@/constants/UserInterface";
import {getUserFromStorage} from "@/utils/getUserFromStorage";

const Delete = () => {
    const [password,setPassword]=useState("")
    const router=useRouter()
    const [user,setUser]=useState<UserInterface | null>(null)

    useEffect(() => {
        getUserFromStorage().then((res)=>{
            setUser(res)
        })
    }, []);

    const deleteAccount= ()=>{
        if(user){
            deleteConfirm(user.email,password).then((res)=>{
                if(res){
                    deleteUserFromFirebase()
                    deleteUserFromStorage().then(()=>{
                        router.replace("/landing")
                        alert("Account deleted")
                    })
                }
                else{
                    alert("Wrong password")
                }
            })
        }
    }

    return(
        <View className="bg-[#160227]" style={{ flex: 1 }}>
            <SafeAreaView style={publicStyles.safeArea}>
                <View
                    style={publicStyles.keyboardContainer}
                >
                    <ScrollView contentContainerStyle={publicStyles.scrollContainer}>
                        <View style={publicStyles.headContainer}>
                            <Text style={[publicStyles.title,{marginTop:50,color:"white"}]}>Confirm delete</Text>
                        </View>
                        <View style={publicStyles.formContainer}>
                            <PasswordInput label={"Password"} onChangeText={setPassword} value={password} placeholder={"Enter Password"} textContentType={"password"}/>
                            <Pressable
                                onPress={() => {
                                    deleteAccount()
                                }}
                                style={[publicStyles.signInButton,{backgroundColor: "black"}]}
                            >
                                <Text style={[publicStyles.signInText,{color:"white"}]}>DELETE ACCOUNT</Text>
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
export default Delete;
