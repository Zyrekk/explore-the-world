import {View, Text, StyleSheet,Pressable} from 'react-native'
import React from 'react'
import {Link, useRouter} from "expo-router";
import {AntDesign} from "@expo/vector-icons";

interface Props {
    name: string;
    icon: any;
    link: string;
}

const SettingsButton = ({name,link,icon}:Props) => {
    const router=useRouter()
    return (
        // @ts-ignore
        <Pressable onPress={()=>router.replace("/modal")}>
            <View
                style={styles.eventButton}
            >
                <View style={styles.eventButtonFlex}>
                    {icon}
                    <Text style={styles.eventButtonText}>
                        {name}
                    </Text>
                </View>
                <AntDesign name="right" size={18} color="black"/>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    eventButton: {
        width: "100%",
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    eventButtonFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    eventButtonText: {
        color: "black",
        fontSize: 18,
    },

})

export default SettingsButton;
