import React, { useContext, useEffect, useState } from "react";
import {
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { UserData } from "../../commons/interfaces/interfaces";
import { getUserDataFromStorage } from "../../commons/utils/AuthContext";

const UserInformation = () => {
    const platform =
        Platform.OS === "ios" ? styles.userInfoIos : styles.userInfoAndroid;
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await getUserDataFromStorage();
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getUserData();
    }, []);

    return (
        <SafeAreaView style={platform}>
            <ScrollView style={styles.scroll}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <View style={styles.mainInfo}>
                    <View style={styles.avatarContainer}>
                        {user?.avatar && (
                            <Image
                                style={styles.avatarImage}
                                source={{
                                    uri: `data:image/jpeg;base64,${user.avatar}`,
                                }}
                            />
                        )}
                    </View>
                    <View style={styles.mainInfoContent}>
                        <Text style={styles.mainInfoText}>
                            {user?.nickname}
                        </Text>
                        <View style={styles.countryInfo}>
                            <Image
                                style={styles.countryInfoImage}
                                source={require("../../../assets/poland.png")}
                            />
                            <Text style={styles.countryInfoText}>POLAND</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.eventContainer}>
                    <Pressable style={styles.eventButton}>
                        <View style={styles.eventButtonFlex}>
                            <Text style={styles.eventButtonText}>
                                🌏 Your trips
                            </Text>
                        </View>
                        <AntDesign name="right" size={18} color="white" />
                    </Pressable>
                    <Pressable style={styles.eventButton}>
                        <View style={styles.eventButtonFlex}>
                            <Text style={styles.eventButtonText}>
                                🏆 Achievements
                            </Text>
                        </View>
                        <AntDesign name="right" size={18} color="white" />
                    </Pressable>
                    <Pressable style={styles.eventButton}>
                        <View style={styles.eventButtonFlex}>
                            <Text style={styles.eventButtonText}>
                                ️️✈️ Flight tickets
                            </Text>
                        </View>
                        <AntDesign name="right" size={18} color="white" />
                    </Pressable>
                    <Pressable style={styles.eventButton}>
                        <View style={styles.eventButtonFlex}>
                            <Text style={styles.eventButtonText}>
                                ️🧑 Friends
                            </Text>
                        </View>
                        <AntDesign name="right" size={18} color="white" />
                    </Pressable>
                    <Pressable style={styles.latestJourneyEvent}>
                        <View style={styles.latestJourneyEventContent}>
                            <Image
                                style={styles.latestJourneyEventImage}
                                source={require("../../../assets/Mexico-City.jpg")}
                            />
                            <Text style={styles.titleText}>
                                Your journey will start in
                            </Text>
                            <Text style={styles.timeText}>
                                10 days, 18 hours, 32 minutes
                            </Text>
                            <View style={styles.semiEllipse}></View>
                            <View style={styles.latestJourneyCountries}>
                                <View style={styles.singleCountry}>
                                    <Text style={styles.singleCountryText}>
                                        Warsaw Chopin Airport
                                    </Text>
                                    <Image
                                        style={styles.singleCountryImage}
                                        source={require("../../../assets/poland.png")}
                                    />
                                </View>
                                <View style={styles.singleCountry}>
                                    <Text style={styles.singleCountryText}>
                                        Mexico City International Airport
                                    </Text>
                                    <Image
                                        style={styles.singleCountryImage}
                                        source={require("../../../assets/mexico.png")}
                                    />
                                </View>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        backgroundColor: "#030712",
    },
    userInfoIos: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#030712",
        width: "100%",
        minHeight: "100%",
    },
    userInfoAndroid: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#030712",
        width: "100%",
        paddingTop: 50,
        minHeight: "100%",
    },
    titleContainer: {
        display: "flex",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 30,
    },
    title: {
        paddingTop: 20,
        color: "#8ca5ff",
        fontSize: 32,
    },
    mainInfoContent: {
        width: "50%",
    },
    semiEllipse: {
        position: "absolute",
        bottom: -135,
        width: 140,
        height: 160,
        borderWidth: 1,
        borderColor: "transparent",
        borderTopColor: "white",

        borderRadius: 10000,
        transform: [{ scaleX: 1.9 }, { scaleY: 1.6 }],
    },
    mainInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        gap: 30,
    },
    avatarContainer: {
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#F6F8E2",
        display: "flex",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        aspectRatio: "1/1",
    },
    avatarImage: {
        borderRadius: 100,
        width: "101%",
        height: "101%",
    },
    mainInfoText: {
        color: "#F6F8E2",
        paddingTop: 15,
        fontSize: 22,
    },
    countryInfo: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    countryInfoImage: {
        borderRadius: 5,
        width: 25,
        aspectRatio: "8/5",
    },
    countryInfoText: {
        fontSize: 14,
        color: "#F6F8E2",
    },
    eventContainer: {
        marginTop: 35,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 35,
    },
    eventButton: {
        width: "100%",
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    eventButtonFlex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    eventButtonText: {
        color: "white",
        fontSize: 18,
    },
    latestJourneyEvent: {
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: "#000000",
        width: "90%",
    },
    latestJourneyEventContent: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: 140,
    },
    latestJourneyEventImage: {
        borderRadius: 10,
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.6,
    },
    titleText: {
        color: "#F6F8E2",
        paddingTop: 10,
        fontSize: 16,
    },
    timeText: {
        color: "#F6F8E2",
        paddingTop: 8,
        fontSize: 18,
    },
    singleCountry: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
    },
    latestJourneyCountries: {
        paddingHorizontal: 5,
        position: "absolute",
        bottom: 5,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    singleCountryText: {
        color: "#F6F8E2",
        fontSize: 10,
    },
    singleCountryImage: {
        borderRadius: 5,
        width: 25,
        height: 15,
    },
});

export { UserInformation };
