import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginRegisterScreen } from "./src/screens/LoginRegisterScreen";
import { OptionsScreen } from "./src/screens/OptionsScreen";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH} from "./FirebaseConfig";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { Navigation } from "./src/components/Navigation";
import {
    AuthContext,
    getUserDataFromStorage,
} from "./src/commons/utils/AuthContext";
import {FavouriteScreen} from "./src/screens/FavouriteScreen";
import {LocalStorageUserSchema} from "./src/commons/interfaces/interfaces";
const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [initializedUser,setInitializedUser]=useState<LocalStorageUserSchema|null>(null)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        const initializeUser = async () => {
            const userData = await getUserDataFromStorage();
            if (userData) {
                setInitializedUser(userData);
            } else {
                console.log("no user in local storage");
            }
        };
        initializeUser();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    {initializedUser ? (
                        <>
                            <Stack.Screen
                                name="Home"
                                // @ts-ignore
                                component={HomeScreen}
                                options={{ headerShown: false }}
                                initialParams={{ user: initializedUser }}
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
                            <Stack.Screen
                                name="Favourite"
                                component={FavouriteScreen}
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
        </AuthContext.Provider>
    );
}
