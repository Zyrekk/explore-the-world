import {View, Text, SafeAreaView} from 'react-native'
import React, {useState} from 'react'
import {useFocusEffect} from "expo-router";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {UserInterface} from "@/constants/UserInterface";
import {TravelPointProps} from "@/app/(auth)/home/mainHome";
import TravelMap from "@/components/Travels/TravelMap";
import TravelsBottomSlide from "@/components/Travels/TravelsBottomSlide";
import HideTravelMarkers from "@/components/Travels/HideTravelMarkers";

const Travels = () => {
    const [clickedTravel,setClickedTravel]=useState<TravelPointProps[]|null>(null)
    const [user, setUser] = useState<UserInterface | null>(null);
    useFocusEffect(() => {
        getUserFromStorage().then((fetchedUser) => {
            if (JSON.stringify(fetchedUser) !== JSON.stringify(user)) {
                setUser(fetchedUser)
            }
        })
    });
    return (
        <View className="flex-1">
            <TravelMap clickedTravel={clickedTravel}/>
            {user && <TravelsBottomSlide user={user} setUser={setUser} setClickedTravel={setClickedTravel}/>}
            {clickedTravel && <HideTravelMarkers setClickedTravel={setClickedTravel}/>}
        </View>
    );
}

export default Travels;
