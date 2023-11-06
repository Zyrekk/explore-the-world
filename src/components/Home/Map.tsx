import React, {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Marker, Region} from 'react-native-maps';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Location from "expo-location";
import {REACT_APP_KEY} from "@env";
import MapViewDirections from 'react-native-maps-directions';
import {reverseGeocode} from "../../commons/utils/geocode";
import axios from "axios/index";

interface MapProps {
    addCoordinates: (coordinates: LatLng) => void;
    origin: LatLng | undefined;
    destination: LatLng | undefined;
    waypoints: LatLng[];
    clearMap: () => void;
    handleType: string;
    setClickedPosition:(coordinate:LatLng) => void;
    setCountryCode:(code:string|null)=>void;
}

const Map = ({addCoordinates,setCountryCode,setClickedPosition, origin, destination, waypoints, clearMap, handleType}: MapProps) => {
    const mapRef = useRef<MapView>(null);
    const [pressMode,setPressMode]=useState("normal")
    const [coords, setCoords] = useState<Region|null>({
        latitude: 54.337508,
        longitude: 18.636932,
        longitudeDelta: 0.05,
        latitudeDelta: 0.05,
    })
    const [markerPosition, setMarkerPosition] = useState();
    const getPermissions = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setCoords({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
        })
        if (mapRef.current !== null) {
            mapRef.current.animateToRegion({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                longitudeDelta: 0.025,
                latitudeDelta: 0.025,
            }, 1000); // Smoothly animate to the new region
        }
    };
    useEffect(() => {
        getPermissions().then();
    }, []);

    // useEffect(() => {
    //     if (mapRef.current !== null) {
    //         mapRef.current.animateToRegion(markerPosition, 1000); // Smoothly animate to the new region
    //     }
    // }, [markerPosition])

    // const handleLongPress = (event: any) => {
    //     const {coordinate} = event.nativeEvent;
    //     setMarkerPosition({
    //         latitude: coordinate.latitude,
    //         longitude: coordinate.longitude,
    //         longitudeDelta: 0.01,
    //         latitudeDelta: 0.01,
    //         selected: true
    //     });
    //     setEndCords({
    //         latitude: coordinate.latitude,
    //         longitude: coordinate.longitude
    //     })
    //     setMarkerSelected(true)
    // };

    const handleMapPress = async(event: { nativeEvent: { coordinate: LatLng } }) => {
         // addCoordinates(event.nativeEvent.coordinate)
        reverseGeocode(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude).then((res)=>{
            setCountryCode(res[0].isoCountryCode)
        })
        setClickedPosition(event.nativeEvent.coordinate)
    };
    return (
        <View style={styles.container}>
            {coords && <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={coords}
                showsUserLocation={true}
                onPress={handleMapPress}
            >
                {destination && <MapViewDirections
                    origin={origin}
                    waypoints={waypoints}
                    destination={destination}
                    apikey={REACT_APP_KEY}
                    strokeWidth={3}
                    strokeColor="#2572e0"
                />}
                {origin && (
                    <Marker
                        coordinate={origin}
                        title="Origin"
                        pinColor="red"
                    />
                )}
                {waypoints.map((waypoint, index) => (
                    <Marker
                        key={`waypoint-${index}`}
                        coordinate={waypoint}
                        title={`Waypoint ${index + 1}`}
                    />
                ))}
                {destination && (
                    <Marker
                        coordinate={destination}
                        title="Destination"
                        pinColor="blue"
                    />
                )}
            </MapView>}

            {(origin || destination || waypoints.length > 0) &&
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={clearMap}
                    >
                        <Text style={{color: "white"}}>Clear map</Text>
                    </TouchableOpacity>
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    map: {
        paddingTop: 20,
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
    },
    clearButton: {
        backgroundColor: "#030712",
        padding: 10,
        borderRadius: 5,
        color: 'white',
    },
});

export {Map};
