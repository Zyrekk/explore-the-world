import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Animated, StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {LoginRegisterScreen} from "./src/screens/LoginRegisterScreen";
import {HomeScreen} from "./src/screens/HomeScreen";
import {ProfileScreen} from "./src/screens/ProfileScreen";
import {OptionsScreen} from "./src/screens/OptionsScreen";
import {Navigation} from "./src/components/Navigation/Navigation";
import {AuthContext, getUserDataFromStorage, UserData} from './src/commons/utils/AuthContext';


export default function App() {

    const Stack = createNativeStackNavigator();

    const [user, setUser] = useState<UserData | null>(null);

    const [opacity, setOpacity] = useState(new Animated.Value(1));

    const renderContent = () => {
        if (user) {
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
                            component={OptionsScreen}
                            options={{headerShown: false}}
                        />
                        {/*<Stack.Screen*/}
                        {/*    name="Options"*/}
                        {/*    options={{headerShown: false}}*/}
                        {/*>*/}
                        {/*    {() => <OptionsScreen handleLogout={handleLogout}/>}*/}
                        {/*</Stack.Screen>*/}
                    </Stack.Navigator>
                    <Navigation/>
                </NavigationContainer>
            </>)
        } else {
            return (<LoginRegisterScreen/>)
        }
    }

    useEffect(() => {
        const initializeUser = async () => {
            const userData = await getUserDataFromStorage();
            setUser(userData);
        };
        initializeUser();
    }, []);
    return (
        <AuthContext.Provider value={{user, setUser}}>
            <View style={styles.container}>
                <Animated.View style={[styles.animationContainer, {opacity: opacity}]}>
                    {renderContent()}
                </Animated.View>
            </View>
        </AuthContext.Provider>
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
