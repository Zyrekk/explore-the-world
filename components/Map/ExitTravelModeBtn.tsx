import {View,Text, Pressable} from 'react-native'
import React from 'react'
import {Entypo} from "@expo/vector-icons";
import {LatLng} from "react-native-maps";

interface Props {
    setMode:(mode:string)=>void;
    setTravelPoints: (points: {
        id:string,
        latlng:LatLng,
        name:string,
    }[]) => void;

}
const ExitTravelModeBtn = ({setTravelPoints,setMode}:Props) => {
    return (
        <View className="absolute items-center flex w-full top-[50]">
            <Pressable onPress={()=>{
                setMode("normal")
                setTravelPoints([])
            }} style={{gap:5}} className="flex w-fit bg-black px-[30] py-[15] rounded-[30px] flex-row items-center">
                <Entypo name="cross" size={24} color="white" />
                <Text className="text-white text-[16px]">Exit travel creator</Text>
            </Pressable>
        </View>
    );
}

export default ExitTravelModeBtn;
