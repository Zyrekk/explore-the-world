import React from 'react';
import MapView, {LatLng} from 'react-native-maps';
import { View} from 'react-native';
import {reverseGeocode} from "@/utils/geocode";
import {ClickedInfoProps} from "@/app/(auth)/home/mainHome";
import {saveUserToStorage} from "@/utils/saveUserToStorage";
import {setWeatherCoords} from "@/utils/setWeatherCoords";


interface MapProps {
    openBottomSheet:()=>void;
    setClickedInfo:(info:ClickedInfoProps)=>void;
}
const Map = ({openBottomSheet,setClickedInfo}:MapProps) => {
    const handleMapClick=async(event: { nativeEvent: { coordinate: LatLng } })=>{
        const coords=event.nativeEvent.coordinate
        const res= await reverseGeocode(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude)
        if(res){
            setClickedInfo({
                latlng:coords,
                countryCode:res[0].isoCountryCode as string,
                name:res[0].city as string,
            })
            await setWeatherCoords(JSON.stringify({coords:coords,city:res[0].city as string,country:res[0].country}));
            openBottomSheet()
        }
    }
    return (
        <View className="flex-1">
            <MapView className="w-full h-full" onPress={handleMapClick} userInterfaceStyle={"dark"} showsMyLocationButton={true} showsUserLocation={true} />
        </View>
    );
}

export default Map;
