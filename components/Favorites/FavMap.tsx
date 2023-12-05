import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import MapView, { LatLng, Marker} from 'react-native-maps';
import {AntDesign} from '@expo/vector-icons';
import {setPlaceId} from "@/utils/setPlaceId";
import {FavList} from "@/app/(auth)/favorites/mainFavorites";
import {getLocation} from "@/utils/getLocation";
import Loader from "@/components/Loader";

interface FavMapProps {
    favList:FavList[];
    router:any;
}
const FavMap = ({favList,router}:FavMapProps) => {
    const [location, setLocation] = useState<LatLng | null>(null);
    const [currentFavList,setCurrentFavList]=useState<FavList[]|null>(favList)

    useEffect(() => {
        setCurrentFavList(favList)
    }, [favList]);

    useEffect(() => {
        getLocation().then((res) => {
            if (res) {
                setLocation(res)
            }
        })
    }, []);


    const handlePlaceId=async(placeId:string,coords:LatLng)=>{
        await setPlaceId(JSON.stringify({placeid:placeId,coords:coords}));
    }

    return (
        <View style={{flex: 1}} className="bg-[#160227]">
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
            </MapView>:
                <SafeAreaView className="flex-1 items-center justify-center">
                    <Loader text={"Map loading..."}/>

                </SafeAreaView>
            }
        </View>
    );
};

export default FavMap;
