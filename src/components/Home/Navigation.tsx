import {StyleSheet, Pressable, SafeAreaView, View, Animated, Dimensions} from "react-native";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


const Navigation= () => {
    const navigation = useNavigation<NavigationProp>();
    const NavValues = {
        HOME: "Home",
        PROFILE: "Profile",
        FAVOURITE: "Favourite",
        SETTINGS: "Settings",
        TRAVELS: "Travels",
    };
    const [selected, setSelected] = useState(NavValues.HOME);

    const [homeAnimation] = useState(new Animated.Value(0));
    const [profileAnimation] = useState(new Animated.Value(0));
    const [settingsAnimation] = useState(new Animated.Value(0));
    const [favouriteAnimation] = useState(new Animated.Value(0));
    const [travelsAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(homeAnimation, {
            toValue: selected === NavValues.HOME ? 1.2 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(profileAnimation, {
            toValue: selected === NavValues.PROFILE ? 1.2 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(settingsAnimation, {
            toValue: selected === NavValues.SETTINGS ? 1.2 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(favouriteAnimation, {
            toValue: selected === NavValues.FAVOURITE ? 1.2 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(travelsAnimation, {
            toValue: selected === NavValues.TRAVELS ? 1.2 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [selected]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', (e) => {
            if (e.data.state && e.data.state.routes) {
                const currentRouteName = e.data.state.routes[e.data.state.index].name;
                setSelected(currentRouteName);
            }
        });
        return unsubscribe;
    }, [navigation]);




    return (
        <SafeAreaView style={styles.nav}>
            <View style={styles.content}>
                <Pressable onPress={() => {
                    setSelected(NavValues.HOME);
                    navigation.navigate('Home');
                }}>
                    <Animated.View style={{ transform: [{ scale: homeAnimation }] }}>
                        <AntDesign name="home" style={selected===NavValues.HOME?styles.iconActive:styles.icon} />
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => setSelected(NavValues.TRAVELS)}>
                    <Animated.View style={{ transform: [{ scale: travelsAnimation }] }}>
                        <Ionicons name="earth" style={selected===NavValues.TRAVELS?styles.iconActive:styles.icon} />
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => {
                    setSelected(NavValues.PROFILE);
                    navigation.navigate('Profile');
                }}>
                    <Animated.View style={{ transform: [{ scale: profileAnimation }] }}>
                        <AntDesign name="user" style={selected===NavValues.PROFILE?styles.iconActive:styles.icon}/>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => setSelected(NavValues.FAVOURITE)}>
                    <Animated.View style={{ transform: [{ scale: favouriteAnimation }] }}>
                        <Feather name="heart" style={selected===NavValues.FAVOURITE?styles.iconActive:styles.icon} />
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => setSelected(NavValues.SETTINGS)}>
                    <Animated.View style={{ transform: [{ scale: settingsAnimation }] }}>
                        <Feather name="menu" style={selected===NavValues.SETTINGS?styles.iconActive:styles.icon} />
                    </Animated.View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    nav: {
        zIndex:100,
        width:"100%",
        position:"absolute",
        bottom:0,
        // backgroundColor:"#ffffff",
        backgroundColor:"#383838"
    },
    content:{
        borderTopWidth:2,
        paddingTop:15,
        borderTop:10,
        borderTopColor:"#a4a4a4",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        textAlign:"center",
        justifyContent:"space-around",
        position:"relative",
        // backgroundColor:"#ffffff"
        backgroundColor:"#383838"
    },
    contentAfter:{
        position:"absolute",
        width:"10%",
        bottom:-10,
        left: 75,
        backgroundColor:"red",
        zIndex:100,
        height:3
    },
    icon:{
        fontSize:30,
        color:"#a2a2a2",
        // color:"white"
    },
    iconActive:{
        fontSize:30,
        // color:"#6f84e3",
        color:"white",

    }
});

export {Navigation};
