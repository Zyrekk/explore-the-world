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
            }} className="w-full bg-black text-white py-[15] rounded-[30px]">
                    <Text className="text-white text-center font-semibold text-[16px]"> Start the journey here  🚀</Text>
            </TouchableOpacity>
    );
}

export default StartJourneyButton;
