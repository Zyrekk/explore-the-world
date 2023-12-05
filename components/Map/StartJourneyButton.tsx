import {View, Text, Pressable, TouchableOpacity} from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";

interface Props {
    setMode:(mode:string)=>void;
}
const StartJourneyButton = ({setMode}:Props) => {
    const router=useRouter()
    return (
            <TouchableOpacity onPress={()=>{
                setMode("travel")
            }} className="min-w-[270px] bg-black text-white px-[60] py-[15] rounded-[18px]">
                    <Text className="text-white text-center font-semibold text-[16px]"> Start the journey 🚀</Text>
            </TouchableOpacity>
    );
}

export default StartJourneyButton;
