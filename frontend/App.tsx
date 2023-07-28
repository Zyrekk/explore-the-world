import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from "./src/screens/HomeScreen";
import {ProfileScreen} from "./src/screens/ProfileScreen";
import {LoginRegisterScreen} from "./src/screens/LoginRegisterScreen"
import {Navigation} from "./src/components/Navigation/Navigation";
import {Animated, StyleSheet, View} from "react-native";
import {OptionsScreen} from "./src/screens/OptionsScreen";
import {UserData} from "./src/commons/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {

    // const tempCredentials = {
    //     email: "Konrad@gmail.com",
    //     password: "123",
    //     username: "Crye_1337",
    //     name: "Konrad",
    //     lastName: "Żyra",
    //     nationality: "poland",
    // };
    const [auth, setAuth] = useState<Boolean>(false)
    const [opacity, setOpacity] = useState(new Animated.Value(1));
    const [user, setUser] = useState<UserData | null>(null);

    const handleLogout = () => {
        setAuth(false);
    }


    const handleAuth = async (email: string, password: string) => {
        const response = await fetch(`http://192.168.0.30:5000/users/getByEmail/kapibara@wp.pl`).then(response => response.json())
        console.log("handle auth")
        if (response.email === email && response.password === password) {
            try {
                await AsyncStorage.setItem('auth', JSON.stringify(true));
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => {
                    setAuth(true);
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                });
            } catch (err) {
                alert(err)
            }

        }
    };
    const loadAuthData = async () => {
        try {
            const authString = await AsyncStorage.getItem('auth');
            const authItem = authString ? JSON.parse(authString) : false;
            setAuth(authItem)
        } catch (error) {
            setAuth(false)
        }
    };
    useEffect(() => {

        loadAuthData(); // Call the async function inside useEffect
    }, []);

    const renderContent = () => {
        if (auth) {
            return (<>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="Options"
                            options={{headerShown: false}}
                        >
                            {() => <OptionsScreen handleLogout={handleLogout}/>}
                        </Stack.Screen>
                    </Stack.Navigator>
                    <Navigation/>
                </NavigationContainer>
            </>)
        } else {
            return (<LoginRegisterScreen handleAuth={handleAuth}/>)
        }
    }
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animationContainer, {opacity: opacity}]}>
                {renderContent()}
            </Animated.View>
        </View>
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
