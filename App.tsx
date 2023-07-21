import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from "./src/screens/HomeScreen";
import {ProfileScreen} from "./src/screens/ProfileScreen";
import {LoginRegisterScreen} from "./src/screens/LoginRegisterScreen"
import {Navigation} from "./src/components/Navigation/Navigation";
import {Animated, View, StyleSheet} from "react-native";
import {SettingsScreen} from "./src/screens/SettingsScreen";

const Stack = createNativeStackNavigator();

interface SettingsScreenFunctionProps {
    handleLogout: () => void;
}

export default function App() {
    const tempCredentials={
        email:"Konrad@gmail.com",
        password:"123",
        username:"Crye_1337",
        name:"Konrad",
        lastName:"Żyra",
        nationality:"poland",
    };
    const [auth, setAuth] = useState<Boolean>(false)
    const [opacity, setOpacity] = useState(new Animated.Value(1));

    const handleAuth = (email:string, password:string) => {
        if(email===tempCredentials.email&& password===tempCredentials.password){
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
            return true
        }
        else{
            return false
        }
    };

    const handleLogout=()=>{
        setAuth(false)
    }

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
                            name="Settings"
                            options={{ headerShown: false }}
                        >
                            {() => <SettingsScreen handleLogout={handleLogout} />}
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
            <Animated.View style={[styles.animationContainer, { opacity: opacity}]}>
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
