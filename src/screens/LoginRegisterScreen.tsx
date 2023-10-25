import {
    Animated,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    View,
} from "react-native";
import React, { useState } from "react";
import { Welcome } from "../components/AuthComponents/Welcome";
import { LoginForm } from "../components/AuthComponents/LoginForm";
import { RegisterForm } from "../components/AuthComponents/RegisterForm";

export const LoginRegisterScreen = () => {
    const types = {
        LOGIN: "Login",
        REGISTER: "Register",
        WELCOME: "Welcome",
    };
    const [screenType, setScreenType] = useState<string>(types.WELCOME);
    const handleAuthScreenSwitch = (type: string) => {
        setScreenType(type);
    };
    const showScreenType = () => {
        switch (screenType) {
            case types.LOGIN:
                return (
                    <LoginForm
                        handleAuthScreenSwitch={handleAuthScreenSwitch}
                    />
                );
            case types.REGISTER:
                return (
                    <RegisterForm
                        handleAuthScreenSwitch={handleAuthScreenSwitch}
                    />
                );
            default:
                return (
                    <Welcome handleAuthScreenSwitch={handleAuthScreenSwitch} />
                );
        }
    };
    return (
        <ImageBackground
            source={require("../../assets/LoginRegisterBackground.jpg")}
            resizeMode={"cover"}
            style={styles.image}
        >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                {showScreenType()}
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
