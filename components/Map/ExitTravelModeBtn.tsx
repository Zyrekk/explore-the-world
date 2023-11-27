import {View,Text, Pressable} from 'react-native'
import React from 'react'
import {Entypo} from "@expo/vector-icons";

interface Props {
    setMode:(mode:string)=>void;
}
const ExitTravelModeBtn = ({setMode}:Props) => {
    return (
        <View className="absolute items-center flex w-full top-[50]">
            <Pressable onPress={()=>{
                setMode("normal")
            }} style={{gap:5}} className="flex w-fit bg-black px-[30] py-[15] rounded-[30px] flex-row items-center">
                <Entypo name="cross" size={24} color="white" />
                <Text className="text-white text-[16px]">Exit travel creator</Text>
            </Pressable>
        </View>
    );
}

export default ExitTravelModeBtn;
