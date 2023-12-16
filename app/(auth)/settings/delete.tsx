import {View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet} from 'react-native'
import React from 'react'
import {deleteUserFromFirebase} from "@/utils/deleteUserFromFirebase";
import {publicStyles} from "@/styles/publicStyles";
import {useRouter} from "expo-router";
import {deleteUserFromStorage} from "@/utils/deleteUserFromStorage";

const Delete = () => {
    const router=useRouter()
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
                            <Pressable
                                onPress={() => {
                                    deleteUserFromFirebase()
                                    deleteUserFromStorage().then(()=>{
                                        router.replace("/landing")
                                        alert("Account deleted")
                                    })
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
