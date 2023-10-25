import {
    Animated,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Options } from "../components/Options/Options";
import { EditProfile } from "../components/EditProfile";
import { OptionTypes } from "../commons/types/OptionTypes";
import React, { useState } from "react";
import { ChangePassword } from "../components/ChangePassword";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

export const OptionsScreen = ({ navigation }: RouterProps) => {
    const [opacity, setOpacity] = useState(new Animated.Value(1));
    const platform =
        Platform.OS === "ios" ? styles.settingsIos : styles.settingsAndroid;
    const [screenType, setScreenType] = useState<string>(OptionTypes.OPTIONS);
    const handleBack = () => {
        setScreenType(OptionTypes.OPTIONS);
    };
    const handleButtonPress = (type: string) => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setScreenType(type);
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };
    const showScreenType = () => {
        switch (screenType) {
            case OptionTypes.OPTIONS:
                return (
                    <Options
                        handleButtonPress={handleButtonPress}
                        navigation={navigation}
                    />
                );
            case OptionTypes.EDIT:
                return <EditProfile handleButtonPress={handleButtonPress} />;
            case OptionTypes.PASSWORD:
                return <ChangePassword handleButtonPress={handleButtonPress} />;
            case OptionTypes.NOTICES:
                return <Text>EDIT</Text>;
            case OptionTypes.LANGUAGE:
                return <Text>EDIT</Text>;
            default:
                return (
                    <Options
                        handleButtonPress={handleButtonPress}
                        navigation={navigation}
                    />
                );
        }
    };
    return (
        <View style={styles.container}>
            <SafeAreaView style={platform}>
                <Animated.ScrollView
                    style={[styles.scroll, { opacity: opacity }]}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {showScreenType()}
                </Animated.ScrollView>
            </SafeAreaView>
        </View>
    );
};
const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        backgroundColor: "#030712",
    },
    container: {
        width: "100%",
        minHeight: "100%",
        alignItems: "center",
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
        minHeight: "100%",
    },
});
