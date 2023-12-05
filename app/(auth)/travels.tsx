import {View, Text, SafeAreaView} from 'react-native'
import React, {useState} from 'react'
import {useFocusEffect} from "expo-router";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {UserInterface} from "@/constants/UserInterface";
import {TravelPointProps} from "@/app/(auth)/home/mainHome";
import TravelMap from "@/components/Travels/TravelMap";

const Travels = () => {
    const [clickedTravel,setClickedTravel]=useState<TravelPointProps|null>(null)
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
            <TravelMap/>
        </View>
    );
}

export default Travels;
