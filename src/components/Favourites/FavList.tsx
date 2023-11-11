import React from 'react';
import {StyleSheet, View,Text} from "react-native";
import {LatLng} from "react-native-maps";
import {FavTile} from "./FavTile";

interface FavListProps {
    places:LatLng[];

}

export const FavList = ({places}:FavListProps) => {
    return (
        <View style={styles.container}>
            {places.map((place,index)=>
                <View key={index}>
                    <FavTile coords={place}/>
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
