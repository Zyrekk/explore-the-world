import {View, Text, ActivityIndicator, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import MapView, {LatLng} from "react-native-maps";
import Loader from "@/components/Loader";
import {getLocation} from "@/utils/getLocation";

const TravelMap = () => {
    const [location, setLocation] = useState<LatLng | null>(null);
    useEffect(() => {
        getLocation().then((res) => {
            if (res) {
                setLocation(res)
            }
        })
    }, []);
    return (
        <View style={{flex: 1}}>
            {location ? <MapView
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
                </MapView> :
                <SafeAreaView className="flex-1 items-center justify-center">
                    <Loader text={"Map loading..."}/>

                </SafeAreaView>
            }
        </View>
    );
}

export default TravelMap;
