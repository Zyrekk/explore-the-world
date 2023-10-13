import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LoginRegisterScreen } from "./src/screens/LoginRegisterScreen";
import { OptionsScreen } from "./src/screens/OptionsScreen";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { Navigation } from "./src/components/Navigation/Navigation";
import { getUserDataFromStorage } from "./src/commons/utils/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        const initializeUser = async () => {
            const userData = await getUserDataFromStorage();
            if (userData) {
                setUser(userData);
            } else {
                console.log("no user in local storage");
            }
        };
        initializeUser();
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {user ? (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Options"
                            component={OptionsScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <Stack.Screen
                        name="Landing"
                        component={LoginRegisterScreen}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
            {user && <Navigation />}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    animationContainer: {
        flex: 1,
    },
});
