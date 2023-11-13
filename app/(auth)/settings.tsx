import {View, Text, Pressable} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {deleteUserFromStorage} from "@/utils/deleteUserFromStorage";
import {useRouter} from "expo-router";

const settings = () => {
    const router=useRouter();
    const logout = () => {
        deleteUserFromStorage().then(()=>{
            router.replace("/login")
        })

    }
    return (
        <SafeAreaView>
            <Pressable onPress={logout}>
                <Text>settings</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default settings;
