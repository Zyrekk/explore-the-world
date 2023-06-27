import {Text, StyleSheet, Pressable, SafeAreaView, View, Animated} from "react-native";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, {useEffect, useState} from "react";

const Navigation = () => {
    const NavValues = {
        HOME: "home",
        PROFILE: "profile",
        SETTINGS: "settings",
    }
    const [selected,setSelected]=useState(NavValues.PROFILE)

    const [homeAnimation] = useState(new Animated.Value(0));
    const [profileAnimation] = useState(new Animated.Value(0));
    const [settingsAnimation] = useState(new Animated.Value(0));

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
    }, [selected]);






    return (
        <SafeAreaView style={styles.nav}>
            <View style={styles.content}>
                <Pressable onPress={() => setSelected(NavValues.HOME)}>
                    <Animated.View style={{ transform: [{ scale: homeAnimation }] }}>
                        <AntDesign name="home" style={selected===NavValues.HOME?styles.iconActive:styles.icon} />
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => setSelected(NavValues.PROFILE)}>
                    <Animated.View style={{ transform: [{ scale: profileAnimation }] }}>
                        <AntDesign name="user" style={selected===NavValues.PROFILE?styles.iconActive:styles.icon}/>
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
        bottom:-10,
        backgroundColor:"#1B3370",
    },
    content:{
        borderTopWidth:2,
        paddingTop:10,
        borderTop:10,
        borderTopColor:"#a4a4a4",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        textAlign:"center",
        justifyContent:"space-around",
        backgroundColor:"#1B3370"

    },
    icon:{
        fontSize:35,
        color:"#a4a4a4",
    },
    iconActive:{
        fontSize:35,
        color:"white",
    }
});

export {Navigation};
