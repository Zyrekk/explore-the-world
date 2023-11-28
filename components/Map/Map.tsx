import React, {useState} from 'react';
import MapView , {LatLng,Marker} from 'react-native-maps';
import { View} from 'react-native';
import {reverseGeocode} from "@/utils/geocode";
import {ClickedInfoProps} from "@/app/(auth)/home/mainHome";
import {setWeatherCoords} from "@/utils/setWeatherCoords";
import {setPlaceId} from "@/utils/setPlaceId";


interface MapProps {
    openBottomSheet:()=>void;
    setClickedInfo:(info:ClickedInfoProps)=>void;
}
const Map = ({openBottomSheet,setClickedInfo}:MapProps) => {
    const [marker,setMarker]=useState<LatLng|null>(null)
    const handleMapClick=async(event: { nativeEvent: { coordinate: LatLng } })=>{
        const coords=event.nativeEvent.coordinate
        setMarker(coords)
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
    const handlePlaceId=async(placeId:string)=>{
        await setPlaceId(JSON.stringify({placeid:placeId}));
    }
    return (
        <View className="flex-1">
            <MapView provider={"google"} onPoiClick={(event)=>{
                handlePlaceId(event.nativeEvent.placeId)
                handleMapClick(event)

            }} className="w-full h-full" userInterfaceStyle={"dark"} showsMyLocationButton={true} showsUserLocation={true}>
                {marker && <Marker coordinate={marker}/>}
            </MapView>
        </View>
    );
}

export default Map;
