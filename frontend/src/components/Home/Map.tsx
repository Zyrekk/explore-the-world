import React, {useEffect, useState} from 'react';
import MapView, {LatLng, MapMarker, Marker} from 'react-native-maps';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Location from "expo-location";
import {REACT_APP_KEY} from "@env";
import MapViewDirections from 'react-native-maps-directions';

interface MapProps {
    addCoordinates: (coordinates: LatLng) => void;
    origin: LatLng | undefined;
    destination: LatLng | undefined;
    waypoints: LatLng[];
}

const Map = ({addCoordinates, origin, destination, waypoints}: MapProps) => {
    const [markerSelected, setMarkerSelected] = useState(false);

    const [begCords, setBegCords] = useState({
        latitude: 53.840328,
        longitude: 19.292040,
    })
    const [endCords, setEndCords] = useState({
        latitude: 53.013790,
        longitude: 18.598444,
    })

    const [coords, setCoords] = useState({
        latitude: 54.352024,
        longitude: 18.646639,
        longitudeDelta: 0.1,
        latitudeDelta: 0.1,
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
        setMarkerPosition({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
            selected: true
        });
        setEndCords({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        })
        setMarkerSelected(true)
    };


    const centerToCoords = () => {
        if (mapRef.current !== null) {
            mapRef.current.animateToRegion(coords, 1000); // Smoothly animate to the 'coords' region
        }
    };

    // const [waypoints, setWaypoints] = useState<LatLng[]>([]);
    // const [destination, setDestination] = useState<LatLng | null>(null);

    const handleMapPress = (event: { nativeEvent: { coordinate: LatLng } }) => {
        addCoordinates(event.nativeEvent.coordinate)
    };

    // const clearMap = () => {
    //     setWaypoints([]);
    //     setDestination(null);
    // };
    return (
        // <View style={styles.container}>
        //     <MapView
        //         ref={mapRef}
        //         style={styles.map}
        //         mapType={'terrain'}
        //         initialRegion={coords}
        //         showsUserLocation={true}
        //         onLongPress={handleLongPress}
        //     >
        //         <MapViewDirections
        //             origin={coords}
        //             destination={endCords}
        //             apikey={REACT_APP_KEY}
        //             strokeWidth={3}
        //             strokeColor="#2572e0"
        //         />
        //         {markerPosition.selected ? (
        //             <Marker
        //                 ref={markerRef}
        //                 coordinate={markerPosition}>
        //                 {markerSelected && (
        //                     <Callout
        //                         onPress={() => {
        //                             markerRef.current?.hideCallout()
        //                         }}
        //                     >
        //                         <Text>lat {markerPosition.latitude}</Text>
        //                         <Text>lng {markerPosition.longitude}</Text>
        //                     </Callout>
        //                 )}
        //             </Marker>
        //         ) : null}
        //     </MapView>
        //     <Pressable style={styles.center} onPress={centerToCoords}>
        //         <MaterialIcons name="my-location" size={30} color="black"/>
        //     </Pressable>
        // </View>
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={coords}
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
            </MapView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.clearButton}
                    // onPress={clearMap}
                >
                    <Text>Wyczyść</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         position: "absolute",
//         left: 0,
//         right: 0,
//         top: 0,
//         width: '100%',
//         height: '100%',
//     },
//     map: {
//         paddingTop: 20,
//         width: '100%',
//         height: '100%',
//     },
//     center: {
//         position: 'absolute',
//         right: 20,
//         bottom: 50
//     }
// });
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
        bottom: 20,
        left: 20,
    },
    clearButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
});

export {Map};
