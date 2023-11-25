import {View, Text, SafeAreaView} from 'react-native'
import React from 'react'
import MapMenuButton from "@/components/Map/MapMenuButton";
import StartJourneyButton from "@/components/Map/StartJourneyButton";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

const MapMenu = () => {
    return (
        <SafeAreaView>
            <View className="w-full px-[50px]">
                <StartJourneyButton/>
                <Text className="w-full text-center text-black text-[24px] font-semibold mb-[40] mt-[30px]">
                    Cieszymowo
                </Text>
                <View style={{gap: 20}} className="flex w-full items-center justify-center flex-col">
                    <MapMenuButton title={"Weather"}
                                   icon={<MaterialCommunityIcons name="weather-cloudy" size={24} color="white"/>}/>
                    <MapMenuButton title={"Country info"}
                                   icon={<Ionicons name="ios-information-circle-outline" size={24} color="white"/>}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MapMenu;
