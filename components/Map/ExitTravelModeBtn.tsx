import {View,Text, Pressable} from 'react-native'
import React from 'react'
import {Entypo} from "@expo/vector-icons";
import {TravelPointProps} from "@/app/(auth)/home/mainHome";

interface Props {
    setMode:(mode:string)=>void;
    setTravelPoints: (points: TravelPointProps[]) => void;

}
const ExitTravelModeBtn = ({setTravelPoints,setMode}:Props) => {
    return (
        <View className="absolute items-center flex w-full top-[50]">
            <Pressable onPress={()=>{
                setMode("normal")
                setTravelPoints([])
            }} style={{gap:5}} className="flex w-fit min-w-[230px] bg-black px-[30] py-[15] rounded-[30px] flex-row justify-center items-center">
                <Entypo name="cross" size={24} color="white" />
                <Text className="text-white text-[16px]">Exit travel creator</Text>
            </Pressable>
        </View>
    );
}

export default ExitTravelModeBtn;
