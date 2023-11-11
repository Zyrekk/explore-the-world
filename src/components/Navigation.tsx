import {
    Animated,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
    Options: undefined;
    Favourite: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Navigation = () => {
    const navigation = useNavigation<NavigationProp>();

    const NavValues = {
        HOME: "Home",
        PROFILE: "Profile",
        FAVOURITE: "Favourite",
        OPTIONS: "Options",
        TRAVELS: "Travels",
    };
    const [selected, setSelected] = useState(NavValues.HOME);
    console.log(selected);

    const [homeAnimation] = useState(new Animated.Value(0));
    const [profileAnimation] = useState(new Animated.Value(0));
    const [optionsAnimation] = useState(new Animated.Value(0));
    const [favouriteAnimation] = useState(new Animated.Value(0));
    const [travelsAnimation] = useState(new Animated.Value(0));
    const platform = Platform.OS === "ios" ? styles.navIos : styles.navAndroid;

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
        Animated.timing(optionsAnimation, {
            toValue: selected === NavValues.OPTIONS ? 1.2 : 1,
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
        const unsubscribe = navigation.addListener("state", (e) => {
            if (e.data.state && e.data.state.routes) {
                const currentRouteName =
                    e.data.state.routes[e.data.state.index].name;
                setSelected(currentRouteName);
            }
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={platform}>
            <View style={styles.content}>
                <Pressable
                    onPress={() => {
                        setSelected(NavValues.HOME);
                        navigation.navigate("Home");
                    }}
                >
                    <Animated.View
                        style={{ transform: [{ scale: homeAnimation }] }}
                    >
                        <View style={styles.navButton}>
                            <AntDesign
                                name="home"
                                style={
                                    selected === NavValues.HOME
                                        ? styles.iconActive
                                        : styles.icon
                                }
                            />
                            <Text
                                style={
                                    selected === NavValues.HOME
                                        ? styles.navButtonTextActive
                                        : styles.navButtonText
                                }
                            >
                                Home
                            </Text>
                        </View>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => setSelected(NavValues.TRAVELS)}>
                    <Animated.View
                        style={{ transform: [{ scale: travelsAnimation }] }}
                    >
                        <View style={styles.navButton}>
                            <Ionicons
                                name="earth"
                                style={
                                    selected === NavValues.TRAVELS
                                        ? styles.iconActive
                                        : styles.icon
                                }
                            />
                            <Text
                                style={
                                    selected === NavValues.TRAVELS
                                        ? styles.navButtonTextActive
                                        : styles.navButtonText
                                }
                            >
                                Travels
                            </Text>
                        </View>
                    </Animated.View>
                </Pressable>

                <Pressable
                    onPress={() => {
                        setSelected(NavValues.PROFILE);
                        navigation.navigate("Profile");
                    }}
                >
                    <Animated.View
                        style={{ transform: [{ scale: profileAnimation }] }}
                    >
                        <View style={styles.navButton}>
                            <AntDesign
                                name="user"
                                style={
                                    selected === NavValues.PROFILE
                                        ? styles.iconActive
                                        : styles.icon
                                }
                            />
                            <Text
                                style={
                                    selected === NavValues.PROFILE
                                        ? styles.navButtonTextActive
                                        : styles.navButtonText
                                }
                            >
                                Profile
                            </Text>
                        </View>
                    </Animated.View>
                </Pressable>

                <Pressable
                    onPress={() => {
                        setSelected(NavValues.FAVOURITE);
                        navigation.navigate("Favourite");

                    }}
                >
                    <Animated.View
                        style={{ transform: [{ scale: favouriteAnimation }] }}
                    >
                        <View style={styles.navButton}>
                            <Feather
                                name="heart"
                                style={
                                    selected === NavValues.FAVOURITE
                                        ? styles.iconActive
                                        : styles.icon
                                }
                            />
                            <Text
                                style={
                                    selected === NavValues.FAVOURITE
                                        ? styles.navButtonTextActive
                                        : styles.navButtonText
                                }
                            >
                                Favourites
                            </Text>
                        </View>
                    </Animated.View>
                </Pressable>

                <Pressable
                    onPress={() => {
                        setSelected(NavValues.OPTIONS);
                        navigation.navigate("Options");
                    }}
                >
                    <Animated.View
                        style={{ transform: [{ scale: optionsAnimation }] }}
                    >
                        <View style={styles.navButton}>
                            <Feather
                                name="menu"
                                style={
                                    selected === NavValues.OPTIONS
                                        ? styles.iconActive
                                        : styles.icon
                                }
                            />
                            <Text
                                style={
                                    selected === NavValues.OPTIONS
                                        ? styles.navButtonTextActive
                                        : styles.navButtonText
                                }
                            >
                                Options
                            </Text>
                        </View>
                    </Animated.View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    navIos: {
        zIndex: 100,
        width: "100%",
        backgroundColor: "#030712",
    },
    navAndroid: {
        zIndex: 100,
        width: "100%",
        position: "absolute",
        bottom: 0,
        paddingBottom: 10,
        // backgroundColor:"#ffffff",
        backgroundColor: "#030712",
    },
    content: {
        borderTopWidth: 2,
        paddingTop: 15,
        borderTop: 10,
        borderTopColor: "#08122d",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "space-around",
        position: "relative",
        // backgroundColor:"#ffffff"
        backgroundColor: "#030712",
    },
    contentAfter: {
        position: "absolute",
        width: "10%",
        bottom: -10,
        left: 75,
        backgroundColor: "red",
        zIndex: 100,
        height: 3,
    },
    icon: {
        fontSize: 26,
        color: "#a2a2a2",
        // color:"white"
    },
    iconActive: {
        fontSize: 26,
        // color:"#6f84e3",
        color: "#ffffff",
    },
    navButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
    },
    navButtonText: {
        color: "#a2a2a2",
        fontSize: 12,
    },
    navButtonTextActive: {
        color: "#F6F8E2",
        fontSize: 12,
    },
});

export { Navigation };
