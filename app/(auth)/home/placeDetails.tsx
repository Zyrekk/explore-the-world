import {View, Text, ScrollView, Dimensions, Image} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Feather, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {StarRating} from "@/components/PlaceDetails/StarRating";
import {OpeningHours} from "@/components/PlaceDetails/OpeningHours";
import {getPlaceId} from "@/utils/getPlaceId";
import {fetchPlaceDetails} from "@/utils/fetchPlaceDetails";
import StandardInfo from "@/components/PlaceDetails/StandardInfo";

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

const PlaceDetails = () => {
    const {width: screenWidth} = Dimensions.get('window');
    const [placeDetails, setPlaceDetails] = useState<PlaceDetailsResponse | null>(null)
    useEffect(() => {
        getPlaceId().then((res) => {
            fetchPlaceDetails(res.placeid).then((res) => setPlaceDetails(res))
        })
    }, []);

    return (
        <ScrollView>
            <View className="bg-[#160227] flex">
                {placeDetails &&
                    <>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={{width: "100%", height: 450}}
                        >
                            <View style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 450,
                                paddingHorizontal: 10
                            }}>
                                <Image style={{borderRadius: 20, height: 400, width: screenWidth - 40}}
                                       source={require('@/assets/images/bazylia.jpg')}/>
                            </View>
                            <View style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 450,
                                paddingHorizontal: 10
                            }}>
                                <Image style={{borderRadius: 20, height: 400, width: screenWidth - 40}}
                                       source={require('@/assets/images/bazylia.jpg')}/>
                            </View>
                        </ScrollView>
                        <View className="max-h-full h-full bg-[#160227] px-[10]">
                            {placeDetails.result.name && <Text className="text-white text-[24px]">{placeDetails.result.name}</Text>}
                            <View style={{gap: 10}} className="flex flex-row items-center mt-[20]">
                                <Text className="text-white text-[18px] font-light">{placeDetails.result.rating}</Text>
                                <View className="flex flex-row gap-[4]">
                                    {placeDetails.result.rating && <StarRating rating={placeDetails.result.rating}/>}
                                </View>
                            </View>
                            {placeDetails.result.formatted_address && <StandardInfo icon={<Ionicons name="ios-location-sharp" size={24} color="#3AA3E4"/>} text={placeDetails.result.formatted_address}/>}
                            {placeDetails.result.opening_hours && <OpeningHours openingHours={placeDetails.result.opening_hours}/>}
                            {placeDetails.result.formatted_phone_number && <StandardInfo icon={<Feather name="phone" size={24} color="#3AA3E4"/>} text={placeDetails.result.formatted_phone_number}/>}
                            {placeDetails.result.website && <StandardInfo icon={<MaterialCommunityIcons name="web" size={24} color="#3AA3E4" />} text={placeDetails.result.website}/>}
                        </View>
                    </>
                }

            </View>
        </ScrollView>
    );
}

export default PlaceDetails;
