import React from 'react';
import MapView, {LatLng} from 'react-native-maps';
import { View} from 'react-native';
import {reverseGeocode} from "@/utils/geocode";


const Map = () => {
    const handleMapClick=async(event: { nativeEvent: { coordinate: LatLng } })=>{
        reverseGeocode(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude).then((res)=>{
            console.log(res[0].isoCountryCode)
        })
    }
    return (
        <View className="flex-1">
            <MapView className="w-full h-full" onPress={handleMapClick} userInterfaceStyle={"light"} showsMyLocationButton={true} showsUserLocation={true} />
        </View>
    );
}

export default Map;
