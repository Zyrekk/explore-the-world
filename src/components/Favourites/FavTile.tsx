import {Pressable, StyleSheet, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {LatLng} from "react-native-maps";
import {reverseGeocode} from "../../commons/utils/geocode";

interface FavTileProps {
    id:number;
    coords: LatLng;
    removePlaceByCoords: (coords:LatLng) => void;
}

export const FavTile = ({id,coords, removePlaceByCoords}: FavTileProps) => {
    const [placeName, setPlaceName] = useState<null | string>(null)
    useEffect(() => {
        reverseGeocode(coords.latitude, coords.longitude).then((res) => {
            const city = res[0].city
            const street = res[0].street
            const streetNumber = res[0].streetNumber
            const address = `${city ? city : ""} ${street ? street : ""} ${streetNumber ? streetNumber : ""}`
            setPlaceName(address)
            // console.log(res[0].street)
        })
    }, []);
    return (
        <Pressable onPress={() => removePlaceByCoords(coords)}
                   style={styles.container}>
            <View style={styles.wrapper}>
                <AntDesign name="heart" size={24} color="red"/>
                <Text style={styles.text}>
                    {placeName}
                </Text>
            </View>
            <AntDesign name="right" size={18} color="white"/>
        </Pressable>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "#fff"
    }
})
