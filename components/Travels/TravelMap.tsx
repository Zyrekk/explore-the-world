import {View, Text, ActivityIndicator, SafeAreaView} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import MapView, {LatLng, Marker} from "react-native-maps";
import Loader from "@/components/Loader";
import {getLocation} from "@/utils/getLocation";
import {TravelPointProps} from "@/app/(auth)/home/mainHome";
import MapViewDirections from "react-native-maps-directions";

interface Props{
    clickedTravel:TravelPointProps[]|null
}
const TravelMap = ({clickedTravel}:Props) => {
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState<LatLng | null>(null);
    useEffect(() => {
        getLocation().then((res) => {
            if (res) {
                setLocation(res)
            }
        })
    }, []);

    useEffect(() => {
        if(clickedTravel){
            if (mapRef.current !== null) {
                mapRef.current.animateToRegion({
                    latitude: clickedTravel[0].latlng.latitude,
                    longitude: clickedTravel[0].latlng.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }, 1000); // Smoothly animate to the new region
            }
        }
    }, [clickedTravel]);
    return (
        <View style={{flex: 1}}>
            {location ? <MapView
                ref={mapRef}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                    }}
                    provider={'google'}
                    style={{flex: 1}}
                    userInterfaceStyle={'dark'}
                    showsMyLocationButton={true}
                    showsUserLocation={true}>
                {clickedTravel && clickedTravel.map((point,index) => (
                    <Marker coordinate={point.latlng} key={index}></Marker>))}
                {clickedTravel && <MapViewDirections
                    origin={clickedTravel[0].latlng}
                    waypoints={clickedTravel.length>1 ? clickedTravel.map((point,index) => (point.latlng)) : []}
                    destination={clickedTravel[clickedTravel.length-1].latlng}
                    apikey={process.env.EXPO_PUBLIC_APP_KEY as string}
                    strokeWidth={3}
                    strokeColor="#2572e0"
                />}
                </MapView> :
                <SafeAreaView className="flex-1 items-center justify-center">
                    <Loader text={"Map loading..."}/>

                </SafeAreaView>
            }
        </View>
    );
}

export default TravelMap;
