import {View, Text, Dimensions, ScrollView, Image} from 'react-native'
import React, {useEffect, useState} from 'react'
import {getPlaceId} from "@/utils/getPlaceId";
import {fetchPlaceDetails} from "@/utils/fetchPlaceDetails";
import {OpeningHours} from "@/components/PlaceDetails/OpeningHours";
import AddToFavorites from "@/components/PlaceDetails/AddToFavorites";
import {StarRating} from "@/components/PlaceDetails/StarRating";
import StandardInfo from "@/components/PlaceDetails/StandardInfo";
import {Feather, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {LatLng} from "react-native-maps";

interface Period {
    close: {
        day: number;
        time: string;
    };
    open: {
        day: number;
        time: string;
    };
}

export interface OpeningHours {
    open_now: boolean;
    periods: Period[];
    weekday_text: string[];
}

interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

interface Result {
    formatted_address: string;
    formatted_phone_number: string;
    icon: string;
    name: string;
    opening_hours: OpeningHours;
    photos: Photo[];
    rating: number;
    types: string[];
    website: string;
}

export interface PlaceDetailsResponse {
    html_attributions: [];
    result: Result;
    status: string;
}

export interface PlaceInfo{
    coords:LatLng;
    placeid:string;

}

const FavDetails = ({refresh}:{refresh:boolean}) => {
    const {width: screenWidth} = Dimensions.get('window');
    const [placeDetails, setPlaceDetails] = useState<PlaceDetailsResponse | null>(null)
    const [placeFav,setPlaceFav]=useState<PlaceInfo|null>(null)
    useEffect(() => {
        getPlaceId().then((res) => {
            fetchPlaceDetails(res.placeid).then((res) => {
                if(res.status!=="REQUEST_DENIED"){
                    setPlaceDetails(res)
                }
                else{
                    alert("GOOGLE KEY EXPIRED ")
                }
            })
                    setPlaceFav(res)
        })
    }, []);
    return (
        <ScrollView className="bg-[#160227]">
            <View className="bg-[#160227] flex flex-grow">
                {placeDetails ?
                    <>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={{width: "100%", height: 450}}
                        >

                            {
                                placeDetails.result.photos && placeDetails.result.photos.length > 0 && placeDetails.result.photos.slice(0, 5).map((photo, index) => (
                                    <View key={index} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 450,
                                        paddingHorizontal: 10
                                    }}>
                                        <Image
                                            key={index}
                                            style={{ borderRadius: 20, height: 400, width: screenWidth - 40 }}
                                            source={{
                                                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${process.env.EXPO_PUBLIC_APP_KEY}`,
                                            }}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                        <View style={{paddingBottom:70}} className="max-h-full h-full bg-[#160227] px-[10]">
                            {placeDetails.result.name && <Text className="text-white text-[24px]">{placeDetails.result.name}</Text>}
                            {placeFav && <AddToFavorites refresh={refresh} placeFav={placeFav}/>}
                            <View style={{gap: 10}} className="flex flex-row items-center mt-[20]">
                                <Text className="text-white text-[18px] font-light">{placeDetails.result.rating}</Text>
                                <View className="flex flex-row gap-[4]">
                                    {placeDetails.result.rating && <StarRating rating={placeDetails.result.rating}/>}
                                </View>
                            </View>
                            {placeDetails.result.formatted_address && <StandardInfo icon={<Ionicons name="ios-location-sharp" size={24} color="#3AA3E4"/>} text={placeDetails.result.formatted_address}/>}
                            {placeDetails.result.opening_hours && <OpeningHours hours={placeDetails.result.opening_hours}/>}
                            {placeDetails.result.formatted_phone_number && <StandardInfo icon={<Feather name="phone" size={24} color="#3AA3E4"/>} text={placeDetails.result.formatted_phone_number}/>}
                            {placeDetails.result.website && <StandardInfo icon={<MaterialCommunityIcons name="web" size={24} color="#3AA3E4" />} text={placeDetails.result.website}/>}
                        </View>
                    </>:
                    <Text className=" text-center flex-wrap flex text-white text-[24px] font-semibold mb-[40] mt-[30px]">
                        GOOGLE KEY EXPIRED, DATA NOT FOUND
                    </Text>
                }

            </View>
        </ScrollView>
    );
}

export default FavDetails;
