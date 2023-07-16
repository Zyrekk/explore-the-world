import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from "./src/screens/HomeScreen";
import {ProfileScreen} from "./src/screens/ProfileScreen";
import {LoginRegisterScreen} from "./src/screens/LoginRegisterScreen"
import {Navigation} from "./src/components/Home/Navigation";
import {SafeAreaView, Text, View} from "react-native";

const Stack = createNativeStackNavigator();


export default function App() {
    const [auth, setAuth] = useState<Boolean>(false)
    return (
        <NavigationContainer>
            {auth ?
                <>
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
                    </Stack.Navigator>
                    <Navigation/>
                </>
                :

                <LoginRegisterScreen/>}
        </NavigationContainer>
    );
}
