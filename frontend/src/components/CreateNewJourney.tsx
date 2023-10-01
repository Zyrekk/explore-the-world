import {Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Feather, Octicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {LatLng} from "react-native-maps";
import {geocode, reverseGeocode} from "../commons/utils/geocode";


interface CreateNewJourneyProps {
    setHandleType: (type: string) => void;
    setCreatorMode: (type: boolean) => void;
    origin: LatLng | undefined;
    waypoints: LatLng[];
    destination: LatLng | undefined;
}

interface locationProps {
    city: string | null;
    country: string | null;
    district: string | null;
    isoCountryCode: string | null;
    name: string | null;
    postalCode: string | null;
    region: string | null;
    street: string | null;
    streetNumber: string | null;
    subregion: string | null;
    timezone: string | null;
}

const CreateNewJourney = ({setHandleType, setCreatorMode, origin, waypoints, destination}: CreateNewJourneyProps) => {


    const [destinationString, setDestinationString] = useState<string>('Destination')

    const fetchLocation = async () => {
        if (destination) {
            const locationData = await reverseGeocode(
                destination?.latitude,
                destination?.longitude
            );
            if (locationData.length > 0 && locationData[0].city !== null) {

                setDestinationString(locationData[0].city)
            }
            //     Array [
            //         Object {
            //         "city": "Kiełpino",
            //             "country": "Polska",
            //             "district": null,
            //             "isoCountryCode": "PL",
            //             "name": "Długa 65B",
            //             "postalCode": "83-307",
            //             "region": "Pomorskie",
            //             "street": "Długa",
            //             "streetNumber": "65B",
            //             "subregion": "Powiat kartuski",
            //             "timezone": "Europe/Warsaw",
            //     },
            // ] make interface

        }
    };

    useEffect(() => {
        fetchLocation();
    }, [destination]);


    return (
        <View style={styles.container}>
            <SafeAreaView style={{gap: 10}}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        setCreatorMode(false)
                    }}
                >
                    <AntDesign
                        name="left"
                        style={{fontSize: 24}}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Your journey starts here</Text>
                <View style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Feather name="circle" size={24} color="black"/>
                    </View>
                    <Pressable onPress={() => {
                        setHandleType('origin')
                        setCreatorMode(false)
                    }} style={styles.button}>
                        <Text
                            style={{fontSize: 18}}>{origin ? origin.latitude + ',' + origin.longitude : 'Origin'}</Text>
                        <Feather name="arrow-right" size={20} color="black"/>
                    </Pressable>
                </View>
                {waypoints.map((waypoint, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.iconWrapper}>
                            <AntDesign name="minuscircleo" size={24} color="black"/>
                        </View>
                        <Pressable onPress={() => {
                        }} style={styles.button}>
                            <Text style={{fontSize: 18}}>{index}</Text>
                        </Pressable>
                    </View>
                ))}
                <Pressable onPress={() => {
                    setHandleType('waypoint')
                    setCreatorMode(false)
                }} style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Feather name="plus-circle" size={24} color="black"/>
                    </View>
                    <Text style={{fontSize: 18}}>Add waypoint</Text>
                </Pressable>
                <View style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Octicons name="location" size={24} color="#DD2C2C"/>
                    </View>
                    <Pressable onPress={() => {
                        setHandleType('destination')
                        setCreatorMode(false)
                    }} style={styles.button}>
                        <Text
                            style={{fontSize: 18}}>{destinationString}</Text>
                        <Feather name="arrow-right" size={20} color="black"/>
                    </Pressable>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center'}}>
                <Pressable onPress={() => {
                    // setCreatorMode(false)
                    // setHandleType('')
                    geocode('Cieszymowo')
                }} style={[{marginTop: 50}, styles.finishButton]}>
                    <Text style={{fontSize: 18, color: 'white'}}>Finish</Text>
                </Pressable>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    iconWrapper: {
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    finishButton: {
        backgroundColor: "#030712",
        width: '80%',
        paddingVertical: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    back: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        fontSize: 26,
        marginBottom: 15

    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 16,

    },
    container: {
        position: 'absolute',
        paddingTop: 70,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "#FFF",
        height: '100%',
    }
    ,
    row: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    }
    ,
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 16,
        width: '70%',
        borderColor: '#000',
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 12,
        paddingHorizontal: 8
    }
});

export default CreateNewJourney;
