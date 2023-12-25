import {View, Text, SafeAreaView, Pressable, TouchableOpacity} from 'react-native'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import BottomSheet from "@gorhom/bottom-sheet";
import {Ionicons} from "@expo/vector-icons";
import {styles} from "@/components/Travels/TravelsBottomSlide";
import {FavList} from "@/app/(auth)/favorites/mainFavorites";
import {LatLng} from "react-native-maps";
import {setPlaceId} from "@/utils/setPlaceId";
import {reverseGeocode} from "@/utils/geocode";

interface Props {
    favList:FavList[]|null;
    router:any;
}

interface FavList2 {
    coords: LatLng;
    id: string;
    address:string;
}

const FavBottomSlide = ({favList,router}: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['11%', '100%'], [])
    const [refresh, setRefresh] = useState<number>(0);
    const [betterFavList,setBetterFavList]=useState<FavList2[]|null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (favList) {
                    const mappedDataPromises = favList.map(async (place: FavList) => {
                        const address = await reverseGeocode(place.coords.latitude, place.coords.longitude);
                        return {
                            coords: place.coords,
                            id: place.id,
                            address: `${address[0].city ? address[0].city : ""} ${address[0].street ? address[0].street : ""}`,
                        };
                    });

                    const mappedData = await Promise.all(mappedDataPromises);
                    setBetterFavList(mappedData);
                }
            } catch (error) {
                // Handle errors if reverseGeocode fails or any other issues
                console.error("Error fetching and mapping data:", error);
            }
        };

        fetchData();
    }, [favList]);

    // const mappedData = await Promise.all(
    //     fetchedUser?.favoritePlaces.map(async (place: FavList) => {
    //         const address = await reverseGeocode(place.coords.latitude, place.coords.longitude);
    //         return {
    //             coords: place.coords,
    //             id: place.id,
    //             address: `${address[0].city?address[0].city:""} ${address[0].street?address[0].street:""}`,
    //         };
    //     })
    // );

    const onShowMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };

    const handlePlaceId=async(placeId:string,coords:LatLng)=>{
        await setPlaceId(JSON.stringify({placeid:placeId,coords:coords}));
        bottomSheetRef.current?.collapse()
        await router.push("/favorites/details")
    }


    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            backgroundStyle={{backgroundColor: '#150227'}}
            handleStyle={{backgroundColor: '#150227'}}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{backgroundColor: "#fff"}}
            style={styles.sheetContainer}>

            <SafeAreaView style={styles.contentContainer}>
                <Text className="text-white text-[24px] mb-[30]">Your favorites list</Text>
                {betterFavList && betterFavList.map((item,index)=>
                    <View
                        className="border-white flex flex-row items-center justify-between border-[2px] rounded-[40px] px-[20] py-[10] w-full"
                        key={index}>
                        <Text style={{flex: 1}} className="text-white text-[16px]">{item.address}</Text>
                        <View style={{gap: 10}} className="flex flex-row">
                            <Pressable className="bg-green-700 rounded-[40px]" onPress={() => {
                                handlePlaceId(item.id,item.coords)
                            }}>
                                <Text
                                    className="text-white px-[10] py-[5] rounded-[10px] text-center w-full font-bold text-[16px]">Select</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </SafeAreaView>
            <View style={styles.absoluteView}>
                <TouchableOpacity onPress={onShowMap} style={styles.btn}>
                    <Text style={{color: '#fff'}}>Map</Text>
                    <Ionicons name="map" size={20} style={{marginLeft: 10}} color={'#fff'}/>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
}

export default FavBottomSlide;
