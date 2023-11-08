import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View, Text, Pressable, ImageProps} from "react-native";
import axios from "axios";
import {LatLng} from "react-native-maps";
import {AntDesign} from "@expo/vector-icons";
import {renderWeatherImage} from "../commons/utils/renderWeatherImage";
import {MapTypes} from "../commons/types/MapTypes";

// import sunny from '../../assets/weather/01d.jpg';

interface CountryInfoProps {
    code: string;
    clickedPosition: LatLng;
    setClickedPosition: (coordinate: LatLng | null) => void;
    setCode: (code: null) => void;
    setIsModalVisible:(modal:boolean)=>void;
    setMode:(mode:string)=>void;
}

export const CountryInfo = ({setIsModalVisible,setMode,setCode, code, clickedPosition, setClickedPosition}: CountryInfoProps) => {
    const [countryInfo, setCountryInfo] = useState<any>();
    const [weather, setWeather] = useState<any>();
    const [imageSource, setImageSource] = useState<ImageProps | null>(null)
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/alpha/${code}`).then(res => {
            setCountryInfo(res.data[0])
        })
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${clickedPosition.latitude}&lon=${clickedPosition.longitude}&units=metric&appid=d4d1cd3c219bc143faa42c3af738a582`).then(res => {
            setWeather(res.data)
            setImageSource(renderWeatherImage(res.data.weather[0].icon))
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
                            setCode(null)
                            setCountryInfo(null)
                            setIsModalVisible(false)
                            setMode(MapTypes.NORMAL)
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
                                    <Text
                                        style={styles.infoItemText}>{countryInfo.capital ? countryInfo.capital[0] : "None"}</Text>
                                </View>
                                {weather && imageSource &&
                                    <View style={styles.infoItemColumn}>
                                        <Text style={styles.infoItemText}>Current city : {weather.name} </Text>
                                        <View style={styles.weatherContent}>
                                            <Image
                                                style={styles.weatherImage}
                                                source={imageSource}
                                            />
                                            <Text style={styles.weatherText}>{weather.weather[0].main.toUpperCase()}</Text>
                                            <Text style={styles.weatherTemp}>{Math.floor(weather.main.temp)}°C</Text>
                                        </View>
                                    </View>
                                }
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoItemText}>Official language: </Text>
                                    <Text
                                        style={styles.infoItemText}>{countryInfo.languages ? countryInfo.languages[Object.keys(countryInfo.languages)[0]] : "None"}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoItemText}>Timezones : </Text>
                                    <Text
                                        style={styles.infoItemText}>{countryInfo.timezones ? countryInfo.timezones[0] : "None"}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoItemText}>Region : </Text>
                                    <Text
                                        style={styles.infoItemText}>{countryInfo.region ? countryInfo.region : "None"}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoItemText}>Subregion : </Text>
                                    <Text
                                        style={styles.infoItemText}>{countryInfo.subregion ? countryInfo.subregion : "None"}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoItemText}>Area : </Text>
                                    <Text
                                        style={styles.infoItemText}>{countryInfo.area ? countryInfo.area + " km^2" : "None"}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoItemText}>Population: </Text>
                                    <Text
                                        style={styles.infoItemText}>{countryInfo.population ? countryInfo.population : "None"}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoItemText}>Currency: </Text>
                                    <Text
                                        style={styles.infoItemText}>{countryInfo.currencies ? countryInfo.currencies[Object.keys(countryInfo.currencies)[0]].name : "None"} ({countryInfo.currencies ? countryInfo.currencies[Object.keys(countryInfo.currencies)[0]].symbol : ""})</Text>
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
    latestJourneyEvent: {
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: "#000000",
        width: "90%",
    },
    weatherContent: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: 140,
    },
    weatherImage: {
        borderRadius: 10,
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.8,
    },
    flag: {
        marginTop: 100,
        borderRadius: 10,
        width: 141,
        height: 94,
    },
    weatherText: {
        width:"100%",
        paddingHorizontal:20,
        color: "#F6F8E2",
        paddingTop: 10,
        fontSize: 20,
        fontWeight:"bold",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    weatherTemp:{
        width:"100%",
        paddingHorizontal:20,
        color: "#F6F8E2",
        textAlign:"right",
        paddingTop: 10,
        fontSize: 50,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10

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
    infoList: {
        width: "100%",
        marginTop: 50,
        gap: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    infoItem: {
        backgroundColor: "#060f26",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: "#1e1e1e",
        borderWidth: 1,
        width: "90%",
        display: "flex",
        flexDirection: "row",
    },
    infoItemColumn: {
        backgroundColor: "#060f26",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 10,
        borderColor: "#1e1e1e",
        borderWidth: 1,
        width: "90%",
        display: "flex",
        flexDirection: "column",

    },
    infoItemText: {
        fontSize: 17,
        color: "#fff",
    },
    countryName: {
        textAlign: "center",
        marginTop: 15,
        fontSize: 24,
        color: "#fff",
    },
    container: {
        width: "100%",
        alignItems: "center",
        flexGrow: 1,
        minHeight: "100%",
        backgroundColor: "#030712",
        paddingBottom: 25,
    },
    mainContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "#030712",
    }
});

