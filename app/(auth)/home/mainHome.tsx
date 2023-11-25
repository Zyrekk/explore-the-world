import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import Map from "@/components/Map/Map";
import BottomSlide from "@/components/BottomSlide";
import StartJourneyButton from "@/components/Map/StartJourneyButton";
import BottomSheet from "@gorhom/bottom-sheet";
import {LatLng} from "react-native-maps";

export interface ClickedInfoProps{
    countryCode:string;
    latlng:LatLng;
    name:string;
}

const Home = () => {
    const [mode, setMode] = useState("xd");
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [clickedInfo,setClickedInfo]=useState<ClickedInfoProps|null>(null)
    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    }
    return (
        <View
            className="flex-1"
        >
            <Map openBottomSheet={openBottomSheet} setClickedInfo={setClickedInfo}/>
            <BottomSlide mode={mode} bottomSheetRef={bottomSheetRef} clickedInfo={clickedInfo}/>
        </View>
    );
};

export default Home;
