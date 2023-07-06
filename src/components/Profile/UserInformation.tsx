import React from "react";
import {StyleSheet, SafeAreaView, Image, Text, View, Pressable, ScrollView, ImageBackground} from "react-native";
import {AntDesign} from '@expo/vector-icons';

const UserInformation = () => {
    return (
        <SafeAreaView style={styles.userInfo}>
            <View style={styles.mainInfo}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatarImage}
                        source={require('../../../assets/stitch2.jpg')}
                    />
                </View>
                <Text style={styles.mainInfoText}>Pan Sticzątko</Text>
                <View style={styles.countryInfo}>
                    <Image style={styles.countryInfoImage} source={require('../../../assets/poland.png')}/>
                    <Text style={styles.countryInfoText}>POLAND</Text>
                </View>
            </View>
            <View style={styles.eventContainer}>
                <Pressable style={styles.eventButton}>
                    <Text style={styles.eventButtonText}>🌏 Your trips</Text>
                    <AntDesign name="right" size={18} color="black"/>
                </Pressable>
                <Pressable style={styles.eventButton}>
                    <Text style={styles.eventButtonText}>🏆 Achievements</Text>
                    <AntDesign name="right" size={18} color="black"/>
                </Pressable>
                <Pressable style={styles.eventButton}>
                    <Text style={styles.eventButtonText}>✈️ Flight tickets</Text>
                    <AntDesign name="right" size={18} color="black"/>
                </Pressable>
                <Pressable style={styles.eventButton}>
                    <Text style={styles.eventButtonText}>🧑 Friends</Text>
                    <AntDesign name="right" size={18} color="black"/>
                </Pressable>
                <Pressable style={styles.latestJourneyEvent}>
                    <View style={styles.latestJourneyEventContent}>
                        <Image style={styles.latestJourneyEventImage}
                               source={require('../../../assets/Mexico-City.jpg')}/>
                        <Text style={styles.titleText}>Your journey will start in</Text>
                        <Text style={styles.timeText}>10 days, 18 hours, 32 minutes</Text>
                        <View style={styles.semiEllipse}></View>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    userInfo: {
        display: "flex",
        alignItems: "center",
        // backgroundColor:"#383838",
        // backgroundColor:"black",
        backgroundColor: "#292a2d",
        width: "100%",
        minHeight: "100%"
    },
    semiEllipse:{
        position:"absolute",
        bottom:-170,
        width: 140,
        height: 160,
        borderWidth:1,
        borderColor:"transparent",
        borderTopColor:"white",

        borderRadius: 10000,
        transform: [
            {scaleX: 1.9,},
            {scaleY: 2,}
        ],
    },
    mainInfo: {
        display: "flex",
        alignItems: "center",
    },
    avatarContainer: {
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#F6F8E2",
        marginTop: 30,
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
        fontSize: 22
    },
    countryInfo: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    countryInfoImage: {
        borderRadius: 5,
        width: 25,
        aspectRatio: "8/5"
    },
    countryInfoText: {
        fontSize: 14,
        color: "#F6F8E2"
    },
    eventContainer: {
        marginTop: 35,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 25,
    },
    eventButton: {
        padding: 10,
        borderRadius: 10,
        width: "90%",
        backgroundColor: "#F6F8E2",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    eventButtonText: {
        color: "black",
        fontSize: 18
    },
    latestJourneyEvent: {
        borderRadius: 10,
        backgroundColor: "#000000",
        width: "90%",
    },
    latestJourneyEventContent: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: 140
    },
    latestJourneyEventImage: {
        borderRadius: 10,
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.6
    },
    titleText: {
        color: "#F6F8E2",
        paddingTop: 10,
        fontSize: 16
    },
    timeText: {
        color: "#F6F8E2",
        paddingTop: 8,
        fontSize: 18
    }


});

export {UserInformation};
