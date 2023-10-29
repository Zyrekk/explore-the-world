import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View, Text} from "react-native";
import axios from "axios";

export const CountryInfo = ({code}: { code: string }) => {
    const [countryInfo, setCountryInfo] = useState<any>();
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/alpha/${code}`).then(res => {
            setCountryInfo(res.data[0])
        })

    }, [code])
    return (
        <View style={styles.container}>
            {countryInfo &&
                <SafeAreaView style={styles.container}>
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
        marginTop: 60,
        borderRadius: 10,
        width: 141,
        height: 94,
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
});

