import React, {useState, useRef, useEffect} from 'react';
import MapView, {Callout, MapMarker, Marker} from 'react-native-maps';
import {StyleSheet, Text, View} from 'react-native';
import * as Location from "expo-location";

const Map = () => {
    const [markerSelected, setMarkerSelected] = useState(false);
    const [coords, setCoords] = useState({
        latitude: 54.352024,
        longitude: 18.646639,
        longitudeDelta: 13,
        latitudeDelta: 13,
    })
    const [markerPosition, setMarkerPosition] = useState({
        latitude: coords.latitude,
        longitude: coords.longitude,
        longitudeDelta: 0.1,
        latitudeDelta: 0.1,
        selected: false,
    });
    const markerRef = React.useRef<MapMarker>(null);
    const mapRef = React.useRef<MapView>(null);
    const getPermissions = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log("Please grant location permissions");
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setCoords({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            longitudeDelta: 13,
            latitudeDelta: 13,
        })
        if (mapRef.current !== null) {
            mapRef.current.animateToRegion(coords, 1000); // Smoothly animate to the new region
        }
    };
    useEffect(() => {
        getPermissions().then();
    }, []);

    useEffect(() => {
        if (mapRef.current !== null) {
            mapRef.current.animateToRegion(markerPosition, 1000); // Smoothly animate to the new region
        }
    }, [markerPosition])

    const handleLongPress = (event: any) => {
        const {coordinate} = event.nativeEvent;
        const {position}=event.nativeEvent;
        setMarkerPosition({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
            selected: true
        });
        setMarkerSelected(true)
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                mapType={'terrain'}
                showsUserLocation={true}
                onLongPress={handleLongPress}
            >
                {markerPosition.selected ? (
                    <Marker
                        ref={markerRef}
                        coordinate={markerPosition}>
                        {markerSelected && (
                            <Callout
                                onPress={()=>{
                                        markerRef.current?.hideCallout()
                                }}
                            >
                                <Text>lat {markerPosition.latitude}</Text>
                                <Text>lng {markerPosition.longitude}</Text>
                            </Callout>
                        )}
                    </Marker>
                ) : null}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export {Map};
