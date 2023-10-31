import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View, Text, Pressable} from "react-native";
import axios from "axios";
import {LatLng} from "react-native-maps";
import {OptionTypes} from "../commons/types/OptionTypes";
import {AntDesign} from "@expo/vector-icons";

interface CountryInfoProps {
    code: string;
    coordinate: LatLng;
    setClickedPosition:(coordinate:LatLng|null) => void;
}

export const CountryInfo = ({code,coordinate,setClickedPosition}: CountryInfoProps) => {
    const [countryInfo, setCountryInfo] = useState<any>();
    const [weather,setWeather]=useState<any>();
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/alpha/${code}`).then(res => {
            setCountryInfo(res.data[0])
        })
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&units=metric&appid=d4d1cd3c219bc143faa42c3af738a582`).then(res=>{
            // setWeather(res.data[0])
            console.log(res.data)
        })

    }, [code])
    return (
        <View style={styles.mainContainer}>
            {countryInfo &&
                <SafeAreaView style={styles.container}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => {
                            setClickedPosition(null)
                        }}
                    >
                        <AntDesign
                            name="left"
                            style={[styles.innerFont, {fontSize: 20}]}
                        />
                        <Text style={[styles.innerFont, {fontSize: 20}]}>
                            Back
                        </Text>
                    </Pressable>
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={{flexGrow: 1}}
                >
                    <View style={styles.container}>
                        <Image
                            style={styles.flag}
                            source={{
                                uri: countryInfo.flags.png,
                            }}
                        />
                        <Text style={styles.countryName}>
                            {countryInfo.name.common}
                        </Text>
                        <View style={styles.infoList}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemText}>Capital : </Text>
                                <Text style={styles.infoItemText}>{countryInfo.capital?countryInfo.capital[0]:"None"}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemText}>Official language: </Text>
                                <Text style={styles.infoItemText}>{countryInfo.languages?countryInfo.languages[Object.keys(countryInfo.languages)[0]]:"None"}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemText}>Timezones : </Text>
                                <Text style={styles.infoItemText}>{countryInfo.timezones?countryInfo.timezones[0]:"None"}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemText}>Region : </Text>
                                <Text style={styles.infoItemText}>{countryInfo.region?countryInfo.region:"None"}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemText}>Subregion : </Text>
                                <Text style={styles.infoItemText}>{countryInfo.subregion?countryInfo.subregion:"None"}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemText}>Area : </Text>
                                <Text style={styles.infoItemText}>{countryInfo.area?countryInfo.area+" km^2":"None"}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemText}>Population: </Text>
                                <Text style={styles.infoItemText}>{countryInfo.population?countryInfo.population:"None"}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemText}>Currency: </Text>
                                <Text style={styles.infoItemText}>{countryInfo.currencies?countryInfo.currencies[Object.keys(countryInfo.currencies)[0]].name:"None"} ({countryInfo.currencies?countryInfo.currencies[Object.keys(countryInfo.currencies)[0]].symbol:""})</Text>
                            </View>


                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        backgroundColor: "#030712",
    },
    flag: {
        marginTop: 100,
        borderRadius: 10,
        width: 141,
        height: 94,
    },
    backButton: {
        position: "absolute",
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        top: 70,
        left: 20,
        fontSize: 26,
        color: "white",
    },
    innerFont: {
        fontSize: 16,
        color: "white",
    },
    infoList:{
        width: "100%",
        marginTop:50,
        gap:20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    infoItem:{
        backgroundColor: "#060f26",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: "#1e1e1e",
        borderWidth:1,
        width: "90%",
        display: "flex",
        flexDirection: "row",
    },
    infoItemText:{
        fontSize: 17,
        color: "#fff",
    },
    countryName: {
        textAlign: "center",
        marginTop:15,
        fontSize: 24,
        color: "#fff",
    },
    container: {
        width: "100%",
        minHeight: "100%",
        alignItems: "center",
        backgroundColor: "#030712",
    },
    mainContainer:{
        position:"absolute",
        top:0,
        left:0,
        width: "100%",
        minHeight: "100%",
        alignItems: "center",
        backgroundColor: "#030712",

    }
});

