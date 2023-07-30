import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Options} from "../components/Options/Options";
import {EditProfile} from "../components/Options/EditProfile";
import {OptionTypes} from "../commons/types/OptionTypes";
import React, {useState} from "react";


export const OptionsScreen = () => {
    const platform = Platform.OS === 'ios' ? styles.settingsIos : styles.settingsAndroid
    const [screenType, setScreenType] = useState<string>(OptionTypes.OPTIONS)
    const handleBack = () => {
        setScreenType(OptionTypes.OPTIONS)
    }
    const showScreenType = () => {
        switch (screenType) {
            case OptionTypes.OPTIONS:
                return <Options setScreenType={setScreenType}/>
            case OptionTypes.EDIT:
                return <EditProfile handleBack={handleBack}/>
            case OptionTypes.PASSWORD:
                return <Text>EDIT</Text>
            case OptionTypes.NOTICES:
                return <Text>EDIT</Text>
            case OptionTypes.LANGUAGE:
                return <Text>EDIT</Text>
            default:
                return <Options setScreenType={setScreenType}/>
        }

    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={platform}>
                <ScrollView style={styles.scroll} contentContainerStyle={{flexGrow: 1}}>
                    {showScreenType()}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        backgroundColor: "#030712"
    },
    container: {
        width: "100%",
        minHeight: "100%",
        alignItems: "center"
    },
    settingsIos: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 60,
        backgroundColor: "#030712",
        width: "100%",
        height: "100%",
    },
    settingsAndroid: {
        display: "flex",
        alignItems: "center",
        gap: 60,

        backgroundColor: "#292a2d",
        width: "100%",
        paddingTop: 50,
        minHeight: "100%"
    },
});
