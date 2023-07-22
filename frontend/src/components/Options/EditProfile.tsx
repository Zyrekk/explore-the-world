import {Pressable, Text, View, StyleSheet,Platform,} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import React from "react";

interface EditProfileProps {
    handleBack: () => void;
}


export const EditProfile = ({handleBack}: EditProfileProps) => {
    const platform = Platform.OS === 'ios' ? styles.backButtonIos : styles.backButtonAndroid

    return (
            <>
                <Pressable style={platform} onPress={handleBack}>
                    <AntDesign name="left" style={[styles.innerFont, {fontSize: 20}]}/>
                    <Text style={[styles.innerFont, {fontSize: 20}]}>Back</Text>
                </Pressable>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Edit profile</Text>
                </View>
                <View style={styles.editSection}>

                </View>
            </>
    )
}

const styles = StyleSheet.create({
    backButtonIos: {
        position: "absolute",
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        top: 20,
        left: 20,
        fontSize: 26,
        color: "white"
    },
    backButtonAndroid: {
        position: "absolute",
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        top: 50,
        left: 20,
        fontSize: 26,
        color: "white"
    },
    innerFont: {
        fontSize: 16,
        color: "white"
    },
    titleContainer: {
        display: "flex",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 30,
    },
    title: {
        paddingTop: 20,
        color: "#8ca5ff",
        fontSize: 32
    },
    editSection: {
        display: "flex",
        flexDirection: "column",
        gap: 30,
        paddingTop: 30,
    },
})
