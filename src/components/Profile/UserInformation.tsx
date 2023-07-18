import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    Image,
    Text,
    View,
    Pressable,
    ScrollView,
    ImageBackground,
    Platform
} from "react-native";
import {AntDesign} from '@expo/vector-icons';

const UserInformation = () => {
    const platform = Platform.OS === 'ios' ? styles.userInfoIos: styles.userInfoAndroid
    return (
        <SafeAreaView style={platform}>
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
                        <View style={styles.latestJourneyCountries}>
                            <View style={styles.singleCountry}>
                                <Text style={styles.singleCountryText}>Warsaw Chopin Airport</Text>
                                <Image style={styles.singleCountryImage}
                                       source={require('../../../assets/poland.png')}/>
                            </View>
                            <View style={styles.singleCountry}>
                                <Text style={styles.singleCountryText}>Mexico City International Airport</Text>
                                <Image style={styles.singleCountryImage}
                                       source={require('../../../assets/mexico.png')}/>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    userInfoIos: {
        display: "flex",
        alignItems: "center",
        // backgroundColor:"#383838",
        // backgroundColor:"black",
        backgroundColor: "#292a2d",
        width: "100%",
        minHeight: "100%"
    },
    userInfoAndroid: {
        display: "flex",
        alignItems: "center",
        // backgroundColor:"#383838",
        // backgroundColor:"black",
        backgroundColor: "#292a2d",
        width: "100%",
        paddingTop:50,
        minHeight: "100%"
    },
    semiEllipse:{
        position:"absolute",
        bottom:-135,
        width: 140,
        height: 160,
        borderWidth:1,
        borderColor:"transparent",
        borderTopColor:"white",

        borderRadius: 10000,
        transform: [
            {scaleX: 1.9,},
            {scaleY: 1.6,}
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
    },
    singleCountry:{
        display:"flex",
        flexDirection:"column",
        gap:5,
        alignItems:"center"

    },
    latestJourneyCountries:{
        paddingHorizontal:5,
        position:"absolute",
        bottom:5,
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    singleCountryText:{
        color: "#F6F8E2",
        fontSize:10,
    },
    singleCountryImage:{
        borderRadius: 5,
        width: 25,
        height:15
    }


});

export {UserInformation};
