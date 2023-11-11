import {ScrollView, SafeAreaView, StyleSheet, View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {LatLng} from "react-native-maps";
import {FavList} from "../components/Favourites/FavList";
import {LocalStorageUserSchema} from "../commons/interfaces/interfaces";
import {getUserDataFromStorage} from "../commons/utils/AuthContext";


export const FavouriteScreen = () => {
    const [selectedPlace, setSelectedPlace] = useState<null | LatLng>()
    const [places, setPlaces] = useState<LatLng[]>([])

    const getUserData = async () => {
        try {
            const userData = await getUserDataFromStorage();
            if (userData) {
                setPlaces(userData.favoritePlaces)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        setTimeout(()=>{
            getUserData();
        },500)
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.settingsIos}>
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={{flexGrow: 1}}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Favourites</Text>
                    </View>
                    {places &&
                        <View>
                            <FavList places={places}/>
                        </View>}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        backgroundColor: "#030712",
    },
    container: {
        width: "100%",
        minHeight: "100%",
        alignItems: "center",
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
    settingsIos: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 60,
        backgroundColor: "#030712",
        width: "100%",
        height: "100%",
    },
    settingsAndroid: {
        display: "flex",
        alignItems: "center",
        gap: 60,

        backgroundColor: "#292a2d",
        width: "100%",
        paddingTop: 50,
        minHeight: "100%",
    },
});

