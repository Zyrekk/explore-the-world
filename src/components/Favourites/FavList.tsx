import React from 'react';
import {StyleSheet, View,Text} from "react-native";
import {LatLng} from "react-native-maps";
import {FavTile} from "./FavTile";

interface FavListProps {
    places:LatLng[];
    setPlaces:(places:LatLng[]) => void;
}

export const FavList = ({places,setPlaces}:FavListProps) => {

    const removePlaceByCoords=(coords:LatLng) => {
        setPlaces(places.filter(place => place.latitude !== coords.latitude || place.longitude !== coords.longitude))
    }

    return (
        <View style={styles.container}>
            {places.map((place,index)=>
                <View key={index}>
                    <FavTile key={index} id={index} removePlaceByCoords={removePlaceByCoords} coords={place}/>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"column",
        gap:20,
        paddingHorizontal:20,
    }
})
