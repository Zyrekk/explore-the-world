import {View, Text, SafeAreaView} from 'react-native'
import React from 'react'
import MapMenuButton from "@/components/Map/MapMenuButton";
import StartJourneyButton from "@/components/Map/StartJourneyButton";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {ClickedInfoProps} from "@/app/(auth)/home/mainHome";
import {useRouter} from "expo-router";

interface Props{
    mode:string;
    clickedInfo:ClickedInfoProps|null;
}
const MapMenu = ({mode,clickedInfo}:Props) => {
    const router=useRouter()
    return (
        <SafeAreaView>
            <View className="w-full px-[50px]">
                {clickedInfo && mode!=="travel" &&
                <>
                    <Text className="w-full text-center text-white text-[24px] font-semibold mb-[40] mt-[30px]">
                        {clickedInfo.name}
                    </Text>
                    <View style={{gap: 20}} className="flex w-full items-center justify-center flex-col">
                        <MapMenuButton router={router} path={"/home/weather"} title={"Weather"}
                                       icon={<MaterialCommunityIcons name="weather-cloudy" size={24} color="white"/>}/>
                        <MapMenuButton router={router} path={"/home/countryInfo"} title={"Country info"}
                                       icon={<Ionicons name="ios-information-circle-outline" size={24} color="white"/>}/>
                        <MapMenuButton router={router} path={"/home/placeDetails"} title={"Place details"}
                                       icon={<MaterialCommunityIcons name="details" size={24} color="white" />}/>
                    </View>
                </>
                }
            </View>
        </SafeAreaView>
    );
}

export default MapMenu;
