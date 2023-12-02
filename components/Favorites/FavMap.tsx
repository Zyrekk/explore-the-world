import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, { LatLng, Marker} from 'react-native-maps';
import {AntDesign} from '@expo/vector-icons';
import {setPlaceId} from "@/utils/setPlaceId";
import {FavList} from "@/app/(auth)/favorites/mainFavorites";

interface FavMapProps {
    favList:FavList[];
    router:any;
}
const FavMap = ({favList,router}:FavMapProps) => {
    const [currentFavList,setCurrentFavList]=useState<FavList[]|null>(favList)

    useEffect(() => {
        setCurrentFavList(favList)
    }, [favList]);


    const handlePlaceId=async(placeId:string,coords:LatLng)=>{
        await setPlaceId(JSON.stringify({placeid:placeId,coords:coords}));
    }

    return (
        <View style={{flex: 1}}>
            <MapView
                provider={'google'}
                style={{flex: 1}}
                userInterfaceStyle={'dark'}
                showsMyLocationButton={true}
                showsUserLocation={true}>
                {currentFavList?.map((fav) => (
                    <Marker
                        coordinate={fav.coords}
                        key={fav.id}
                        onPress={() => {
                            handlePlaceId(fav.id,fav.coords)
                            router.push("/favorites/details")
                        }}>
                        <View style={{alignItems: 'center'}}>
                            <AntDesign name="heart" size={30} color="red"/>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

export default FavMap;
