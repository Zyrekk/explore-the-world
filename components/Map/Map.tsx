import React, {useEffect, useState} from "react";
import MapView, {LatLng, Marker} from "react-native-maps";
import {SafeAreaView, View} from "react-native";
import {reverseGeocode} from "@/utils/geocode";
import {ClickedInfoProps, TravelPointProps} from "@/app/(auth)/home/mainHome";
import {setWeatherCoords} from "@/utils/setWeatherCoords";
import {setPlaceId} from "@/utils/setPlaceId";
import {setCountryCode} from "@/utils/setCountryCode";
import MapViewDirections from 'react-native-maps-directions';
import { uid } from 'uid';
import {AntDesign, Entypo, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {getLocation} from "@/utils/getLocation";
import Loader from "@/components/Loader";

interface MapProps {
    openBottomSheet: () => void;
    setClickedInfo: (info: ClickedInfoProps) => void;
    clickedInfo: ClickedInfoProps | null;
    travelPoints: TravelPointProps[];
    setTravelPoints: (points: TravelPointProps[]) => void;
    mode: string;
}

const Map = ({mode, openBottomSheet, travelPoints, setTravelPoints, clickedInfo, setClickedInfo}: MapProps) => {
    const [location, setLocation] = useState<LatLng | null>(null);
    const [marker, setMarker] = useState<LatLng | null>(null);
    const origin= travelPoints[0]?.latlng;
    const destination= travelPoints[travelPoints.length-1]?.latlng;
    const waypoints=travelPoints.slice(1,-1);

    const handleMapClick = async (event: {
        nativeEvent: { coordinate: LatLng };
    }) => {
        const coords = event.nativeEvent.coordinate;
        if (mode === "normal") {
            setMarker(coords);
            const res = await reverseGeocode(
                event.nativeEvent.coordinate.latitude,
                event.nativeEvent.coordinate.longitude
            );
            if (res) {
                setClickedInfo({
                    latlng: coords,
                    countryCode: res[0].isoCountryCode as string,
                    name: res[0].city as string,
                });
                await setWeatherCoords(
                    JSON.stringify({
                        coords: coords,
                        city: res[0].city as string,
                        country: res[0].country,
                    })
                );
                await setCountryCode(
                    JSON.stringify({
                        countryCode: res[0].isoCountryCode as string,
                    })
                );
                openBottomSheet();
            }
        }
        if (mode === "travel") {
            const name=await reverseGeocode(
                event.nativeEvent.coordinate.latitude,
                event.nativeEvent.coordinate.longitude
            )
            if(name){
            setTravelPoints([...travelPoints, {
                id:uid(11),
                latlng:coords,
                name:`${name[0].city?name[0].city:""} ${name[0].street?name[0].street:""} ${name[0].streetNumber? name[0].streetNumber:""}`
            }]);
            }
        }
    };
    const handlePlaceId = async (placeId: string, coords: LatLng) => {
        await setPlaceId(JSON.stringify({placeid: placeId, coords: coords}));
        if (mode === "normal") {
            setMarker(coords);
            const res = await reverseGeocode(
                coords.latitude,
                coords.longitude
            );
            if (res) {
                setClickedInfo({
                    latlng: coords,
                    countryCode: res[0].isoCountryCode as string,
                    name:`${res[0].city?res[0].city:""} ${res[0].street?res[0].street:""} ${res[0].streetNumber? res[0].streetNumber:""}`
                });
                await setWeatherCoords(
                    JSON.stringify({
                        coords: coords,
                        city: res[0].city as string,
                        country: res[0].country,
                    })
                );
                await setCountryCode(
                    JSON.stringify({
                        countryCode: res[0].isoCountryCode as string,
                    })
                );
                openBottomSheet();
            }
        }
    };

    useEffect(() => {
        getLocation().then((res) => {
            if (res) {
                setLocation(res)
            }
        })
    }, []);
    return (
        <View className="flex-1">

            {location ? <MapView
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                    }}
                provider={"google"}
                onPoiClick={(event) => {
                    handlePlaceId(
                        event.nativeEvent.placeId,
                        event.nativeEvent.coordinate
                    );
                }}
                onPress={(event) => {
                    handleMapClick(event);
                }}
                className="w-full h-full"
                userInterfaceStyle={"dark"}
                showsMyLocationButton={true}
                showsUserLocation={true}
            >
                {marker && mode==="normal" && clickedInfo && <Marker coordinate={marker}/>}
                {origin && <Marker coordinate={origin}>
                    <View style={{alignItems: 'center'}}>
                        <FontAwesome5 name="map-pin" size={32} color="blue" />
                    </View>
                </Marker>}
                {destination && travelPoints.length>1 && <Marker coordinate={destination}>
                    <View style={{alignItems: 'center'}}>
                        <FontAwesome5 name="map-pin" size={32} color="red" />
                    </View>
                </Marker>}
                {waypoints && waypoints.map((point,index) => (
                    <Marker key={index} coordinate={point.latlng}>
                        <View style={{alignItems: 'center'}}>
                            <FontAwesome5 name="map-pin" size={32} color="black" />
                        </View>
                    </Marker>
                ))}

                <MapViewDirections
                    origin={origin}
                    waypoints={waypoints.map((point) => point.latlng)}
                    destination={destination}
                    apikey={process.env.EXPO_PUBLIC_APP_KEY as string}
                    strokeWidth={3}
                    strokeColor="#2572e0"
                />
            </MapView>:
                <SafeAreaView className="flex-1 items-center justify-center">
                    <Loader text={"Map loading..."}/>

                </SafeAreaView>
            }
        </View>
    );
};

export default Map;
