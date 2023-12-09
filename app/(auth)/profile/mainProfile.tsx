import {Text, StyleSheet, Pressable, View, ScrollView, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {UserInterface} from "@/constants/UserInterface";
import React, {useState} from "react";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import countryEmoji from "country-emoji";
import {Link, useFocusEffect} from "expo-router";

const Profile = () => {

    const [user, setUser] = useState<UserInterface | null>(null);
    useFocusEffect(() => {
        getUserFromStorage().then((fetchedUser) => {
            if (JSON.stringify(fetchedUser) !== JSON.stringify(user)) {
                setUser(fetchedUser)
            }
        })
    });

    return (
        <SafeAreaView className="bg-[#160227]" style={styles.container}>
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
                        <Text style={styles.mainInfoText}>
                            {user?.name}
                        </Text>
                        <Text style={styles.mainInfoText}>
                            {user?.lastname}
                        </Text>
                        {user &&
                            <View style={styles.countryInfo}>
                                <Text style={{fontSize: 20}}>
                                    {user.country && countryEmoji.flag(
                                        user.country?.cca2
                                    ) || ""}
                                </Text>
                                <Text
                                    style={styles.countryInfoText}>{user.country?.name.toString().toUpperCase()}</Text>
                            </View>
                        }
                    </View>
                </View>
                <View style={styles.eventContainer}>
                    <Link href={"/travels"}>
                        <View style={styles.eventButton}>
                            <View style={styles.eventButtonFlex}>
                                <Text style={styles.eventButtonText}>
                                    🌏 Your trips
                                </Text>
                            </View>
                            <AntDesign name="right" size={18} color="white"/>
                        </View>
                    </Link>
                    <Link href={"/profile/flights"}>
                    <View style={styles.eventButton}>
                        <View style={styles.eventButtonFlex}>
                            <Text style={styles.eventButtonText}>
                                ️️✈️ Search lights
                            </Text>
                        </View>
                        <AntDesign name="right" size={18} color="white"/>
                    </View>
                    </Link>
                    <Link href={"/profile/translate"}>
                    <View style={styles.eventButton}>
                        <View style={styles.eventButtonFlex}>
                            <Text style={styles.eventButtonText}>
                                ️<MaterialCommunityIcons name="translate" size={24} color="white" />  Translate
                            </Text>
                        </View>
                        <AntDesign name="right" size={18} color="white"/>
                    </View>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    scroll: {
        width: "100%",
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
        color: "white",
        fontSize: 32,
    },
    mainInfoContent: {
        width: "50%",
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
        borderColor: "white",
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
        color: "white",
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
        color: "white",
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
    titleText: {
        color: "white",
        paddingTop: 10,
        fontSize: 16,
    },
    timeText: {
        color: "white",
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
        color: "white",
        fontSize: 10,
    },
    singleCountryImage: {
        borderRadius: 5,
        width: 25,
        height: 15,
    },
});

export default Profile;
